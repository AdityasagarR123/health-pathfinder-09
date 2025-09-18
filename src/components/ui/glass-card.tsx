import * as React from "react";
import { Activity, Heart, TrendingUp, ChevronDown } from "lucide-react";

const MedicalLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7L12 2z"/>
    <path d="M12 7v10"/>
    <path d="M7 12h10"/>
  </svg>
);

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: "prediction" | "treatment" | "analytics";
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, title = "Cancer Analysis", description = "AI-powered predictions and treatment recommendations", variant = "prediction", ...props }, ref) => {
    const getVariantConfig = () => {
      switch (variant) {
        case "prediction":
          return {
            icon: Activity,
            gradient: "from-primary/20 to-medical-success/20",
            iconColor: "text-primary",
            title: title || "Risk Prediction",
            desc: description || "AI-powered cancer risk analysis"
          };
        case "treatment":
          return {
            icon: Heart,
            gradient: "from-medical-success/20 to-primary/20",
            iconColor: "text-medical-success",
            title: title || "Treatment Plan",
            desc: description || "Personalized treatment recommendations"
          };
        case "analytics":
          return {
            icon: TrendingUp,
            gradient: "from-medical-warning/20 to-primary/20",
            iconColor: "text-medical-warning",
            title: title || "Survivability Analytics",
            desc: description || "Data-driven survival insights"
          };
        default:
          return {
            icon: Activity,
            gradient: "from-primary/20 to-medical-success/20",
            iconColor: "text-primary",
            title: title || "Medical Analysis",
            desc: description || "Healthcare analytics dashboard"
          };
      }
    };

    const config = getVariantConfig();
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={`group h-[320px] w-[300px] [perspective:1000px] ${className}`}
        {...props}
      >
        <div className={`relative h-full rounded-3xl bg-gradient-to-br ${config.gradient} backdrop-blur-xl border border-white/20 shadow-glass transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]`}>
          <div className="absolute inset-2 rounded-[20px] border-b border-l border-white/10 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
          
          <div className="absolute [transform:translate3d(0,0,26px)] p-6 pt-20">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 mb-4 ${config.iconColor}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {config.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {config.desc}
            </p>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
            <div className="flex gap-2 [transform-style:preserve-3d]">
              {[
                { icon: Activity, delay: "400ms" },
                { icon: Heart, delay: "600ms" },
                { icon: TrendingUp, delay: "800ms" },
              ].map(({ icon: ActionIcon, delay }, index) => (
                <button
                  key={index}
                  className="group/social grid h-8 w-8 place-content-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-200 ease-in-out group-hover:[transform:translate3d(0,0,20px)] hover:bg-primary hover:border-primary/50"
                  style={{ transitionDelay: delay }}
                >
                  <ActionIcon className="h-4 w-4 text-foreground group-hover/social:text-primary-foreground transition-colors" />
                </button>
              ))}
            </div>
            
            <div className="flex items-center cursor-pointer transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)]">
              <button className="text-xs font-semibold text-foreground mr-1">
                View Details
              </button>
              <ChevronDown className="h-4 w-4 text-foreground" strokeWidth={2} />
            </div>
          </div>

          <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
            {[
              { size: "120px", pos: "8px", z: "15px", delay: "0s" },
              { size: "90px", pos: "12px", z: "30px", delay: "0.3s" },
              { size: "60px", pos: "18px", z: "45px", delay: "0.6s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="absolute aspect-square rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              />
            ))}
            
            <div
              className="absolute grid aspect-square w-12 h-12 place-content-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-medical transition-all duration-500 ease-in-out [transform:translate3d(0,0,60px)] group-hover:[transform:translate3d(0,0,75px)]"
              style={{ top: "24px", right: "24px", transitionDelay: "0.9s" }}
            >
              <MedicalLogo className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;