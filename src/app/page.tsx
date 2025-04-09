import { ProfileDescription } from "@/app/components/profileDescription";
import PortfolioWorks from "./components/portfolioWorks";
export default function Home() {
  return (
    <div>
      <main>
        <ProfileDescription/>
        <PortfolioWorks/>
      </main>
    </div>
  );
}
