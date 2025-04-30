import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '@/styles/contact.module.css'
import { useState, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [status, setStatus] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // 日付を生成
  const now = new Date();
  const formatted = now.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // メッセージに日付を付け加える
  const messageWithDate = `【送信日時】${formatted}\n${data.message}`;

    try {
      setStatus('')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          message: messageWithDate, // ここで上書き
        }),
      });

      if (response.ok) {
        reset()
        setTimeout(()=>{
          setStatus('メッセージが送信されました');
        }, 100);
      } else {
        setStatus('送信に失敗しました');
      }
    } catch (error) {
      setStatus('送信中にエラーが発生しました');
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  
  // メッセージが設定されたら表示 → 3秒後に非表示
  useEffect(() => {
    if (status) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);
  return (
    <div className={styles['contact-form-root']}>
      <p className={styles['contact-title']}>CONTACT</p>
      <p className={styles['contact-form-text']}>ポートフォリオをご覧いただいたご感想やご意見、ご指摘などがありましたら、メッセージ欄にお気軽にご記入いただけると嬉しいです。今後の参考にさせていただきますので、どうぞよろしくお願いします。
      </p>
      <form 
        className={styles['contact-form']}
        onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="name">名前</label>
          <div className={styles['error-wrapper']}>
            <input
                className={`${styles['input']} ${
                  errors.name?.type === 'required' ? styles['error-required'] : ''
                }`}
              type="text"
              id="name"
              {...register('name', { required: '名前は必須です' })}
            />
            {errors.name && <p className={styles['error-message']}>{errors.name.message}</p>}
          </div>
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="email">メールアドレス</label>
          <div className={styles['error-wrapper']}>
            <input
                className={`${styles['input']} ${
                  errors.name?.type === 'required' ? styles['error-required'] : ''
                }`}
              type="email"
              id="email"
              {...register('email', {
                required: 'メールアドレスは必須です',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: '無効なメールアドレス',
                },
              })}
            />
            {errors.email && <p className={styles['error-message']}>{errors.email.message}</p>}
          </div>
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor="message">メッセージ</label>
          <div className={styles['error-wrapper']}>
            <textarea
                className={`${styles['input']} ${styles['message']} ${
                  errors.name?.type === 'required' ? styles['error-required'] : ''
                }`}
              id="message"
              {...register('message', { required: 'メッセージは必須です' })}
            />
            {errors.message && <p className={styles['error-message']}>{errors.message.message}</p>}
          </div>
        </div>
        <button 
          className={styles['submit']}
          type="submit">送信</button>
      </form>

      {status && <p className={`${styles['status-message']} ${!isVisible ? styles['hidden'] : ''}`}>{status}</p>} {/* ステータスメッセージを表示 */}
    </div>
  );
};

export default ContactForm;
