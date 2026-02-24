import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const kpiCards = [
  { label: 'Total Revenue', value: '$384,200', delta: '+12.4%', trend: 'up' },
  { label: 'Active Users', value: '28,304', delta: '+6.7%', trend: 'up' },
  { label: 'Conversion Rate', value: '4.83%', delta: '-0.6%', trend: 'down' },
  { label: 'Avg. Session', value: '6m 12s', delta: '+9.2%', trend: 'up' }
];

const trafficData = [
  { month: 'Jan', visitors: 12000, signups: 1500 },
  { month: 'Feb', visitors: 13800, signups: 1820 },
  { month: 'Mar', visitors: 16400, signups: 2200 },
  { month: 'Apr', visitors: 15600, signups: 2100 },
  { month: 'May', visitors: 18100, signups: 2480 },
  { month: 'Jun', visitors: 19400, signups: 2710 },
  { month: 'Jul', visitors: 20800, signups: 3020 }
];

const channelData = [
  { name: 'Organic', value: 43 },
  { name: 'Paid Search', value: 22 },
  { name: 'Social', value: 18 },
  { name: 'Referral', value: 10 },
  { name: 'Email', value: 7 }
];

const COLORS = ['#4f46e5', '#7c3aed', '#2563eb', '#059669', '#ea580c'];

export default function App() {
  return (
    <main className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">Performance Overview</p>
          <h1>Analytics Dashboard</h1>
        </div>
        <button className="primary-btn">Export report</button>
      </header>

      <section className="kpi-grid">
        {kpiCards.map((card) => (
          <article className="card" key={card.label}>
            <p>{card.label}</p>
            <h2>{card.value}</h2>
            <span className={card.trend === 'up' ? 'delta up' : 'delta down'}>{card.delta}</span>
          </article>
        ))}
      </section>

      <section className="charts-grid">
        <article className="card chart-card">
          <div className="section-header">
            <h3>Traffic & Signups</h3>
            <p>Last 7 months</p>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#4f46e5"
                  fillOpacity={1}
                  fill="url(#visitorGradient)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="signups"
                  stroke="#059669"
                  fillOpacity={1}
                  fill="url(#signupGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="card chart-card">
          <div className="section-header">
            <h3>Acquisition Channels</h3>
            <p>Current month</p>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={110}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
    </main>
  );
}

