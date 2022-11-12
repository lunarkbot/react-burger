import {useState} from 'react';

export function useDiffDate() {
  const [diffDate, setDiffDate] = useState<string | null>(null)

  function setDate(date: string) {
    const orderDate: any = new Date(date);
    const now: any = new Date();
    const today: any = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (today - orderDate < 0) {
      setDiffDate('Сегодня');
    } else {
      const fromOrderToTodayDays: number = Math.floor((today - orderDate) / 1000 / 60 / 60 / 24);
      const result: string = fromOrderToTodayDays === 0
        ? 'Вчера'
        : `${fromOrderToTodayDays + 1} дня назад`;

      setDiffDate(result);
    }
  }

  return { diffDate, setDate };
}
