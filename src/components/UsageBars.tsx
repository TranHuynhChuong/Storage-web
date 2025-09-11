import React from 'react';
import { convertFileSize } from '@/lib/utils';

type UsageItem = {
  size: number;
  latestDate: Date;
};

type Usage = {
  image: UsageItem;
  document: UsageItem;
  video: UsageItem;
  audio: UsageItem;
  other: UsageItem;
  used: number;
};

interface UsageBarsProps {
  data: Usage;
  totalCapacity: number;
}

interface UsagePercent {
  title: string;
  percent: number;
  className: string;
}

const mapUsagePercent = (
  usage: Usage,
  totalCapacity: number,
): UsagePercent[] => {
  const safeCapacity = totalCapacity || 1; // tránh chia cho 0

  return [
    {
      title: 'Documents',
      className: 'bg-orange',
      percent: Math.min((usage.document.size / safeCapacity) * 100, 100),
    },
    {
      title: 'Images',
      className: 'bg-blue',
      percent: Math.min((usage.image.size / safeCapacity) * 100, 100),
    },
    {
      title: 'Media',
      className: 'bg-green',
      percent: Math.min(
        ((usage.video.size + usage.audio.size) / safeCapacity) * 100,
        100,
      ),
    },
    {
      title: 'Others',
      className: 'bg-pink',
      percent: Math.min((usage.other.size / safeCapacity) * 100, 100),
    },
  ];
};

const UsageBars: React.FC<UsageBarsProps> = ({ data, totalCapacity }) => {
  const percents = mapUsagePercent(data, totalCapacity);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-6 flex rounded-sm bg-gray-200 overflow-hidden">
        {percents.map((item, idx) => (
          <div
            key={idx}
            className={`h-6 flex-none ${item.className}`}
            style={{ width: `${item.percent}%` }}
            title={`${item.title}: ${convertFileSize((item.percent / 100) * totalCapacity)}`}
          />
        ))}
      </div>

      <span className="h3 text-light-200">{convertFileSize(data.used)}</span>
      <span className="h3">/ {convertFileSize(totalCapacity)}</span>
    </div>
  );
};

export default UsageBars;
