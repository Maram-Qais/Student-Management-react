import { useState, useEffect } from "react";

export default function OverviewPage({ stats = [], activities = [], extra = null, theme }) {
  const isDark = theme === "dark";
  const [animate, setAnimate] = useState(true);

  // Stop bounce animation after 2s
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const bg = isDark ? "bg-gray-800" : "bg-white";
  const cardHover = isDark ? "hover:shadow-gray-600" : "hover:shadow-lg";
  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen p-4 space-y-4 ${isDark ? "bg-gray-900" : "bg-gray-100"} ${textColor}`}>

      {/* Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${stats.length} gap-4`}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          const iconColor = s.color ? `text-${s.color}-500` : "text-blue-500";
          return (
            <div key={i} className={`flex justify-between items-center p-4 md:p-5 rounded shadow ${bg} ${cardHover} transition`}>
              <div>
                <p className={`text-sm md:text-base font-medium ${textColor}`}>{s.title}</p>
                <p className={`text-xl md:text-2xl font-bold ${textColor}`}>{s.value}</p>
              </div>
              {Icon && <Icon className={`h-8 w-8 md:h-10 md:w-10 ${iconColor} ${animate ? "animate-bounce" : ""}`} />}
            </div>
          );
        })}
      </div>

      {/* Activities / Recent Items */}
      {activities.length > 0 && (
        <div className={`p-4 md:p-5 rounded shadow ${bg} ${cardHover} transition`}>
          <h2 className={`text-sm md:text-base font-semibold mb-2 ${textColor}`}>Recent Activities</h2>
          <div className="space-y-1 text-xs md:text-sm">
            {activities.map((a, i) => (
              <p key={i} className={textColor}>{a}</p>
            ))}
          </div>
        </div>
      )}

      {/* Extra Section */}
      {extra && (
        <div className={`p-4 md:p-5 rounded shadow ${bg} ${cardHover} transition`}>
          {extra}
        </div>
      )}

    </div>
  );
}
