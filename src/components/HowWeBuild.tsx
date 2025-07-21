import { Users, Monitor, CheckCircle, Sparkles } from "lucide-react";

const HowWeBuild = () => {
  const tools = [
    { name: "React & Next.js", category: "Frontend Development", percentage: 95 },
    { name: "TypeScript & JavaScript", category: "Programming Languages", percentage: 90 },
    { name: "Node.js & Express", category: "Backend Development", percentage: 85 },
    { name: "Tailwind CSS & Figma", category: "UI/UX Design", percentage: 92 },
    { name: "AWS & Vercel", category: "Cloud Hosting", percentage: 88 },
    { name: "MongoDB & PostgreSQL", category: "Database Management", percentage: 87 }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Monitor, value: "1000+", label: "Projects Delivered" },
    { icon: Sparkles, value: "10+", label: "Years Experience" },
    { icon: CheckCircle, value: "99.9%", label: "Success Rate" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cool Tools We Use
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We use the latest and greatest technologies to build amazing websites
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.category}</p>
                </div>
                <span className="text-lg font-bold text-orange-500">{tool.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${tool.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-500 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HowWeBuild;