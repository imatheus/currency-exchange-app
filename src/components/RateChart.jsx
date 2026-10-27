import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { formatDate } from '../utils/format.js';

export default function RateChart({ records }) {
  const data = [...records].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} minTickGap={40} />
          <YAxis domain={['auto', 'auto']} width={60} />
          <Tooltip labelFormatter={formatDate} />
          <Line type="monotone" dataKey="rate" name="Cotação" stroke="#1a4fb4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
