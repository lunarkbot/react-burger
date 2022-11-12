import React, {FC, useEffect, useState} from 'react';
import {useDiffDate} from '../../hooks/useDiffDate';

type TOrderDate = {
  date: string;
}

export const OrderDate: FC<TOrderDate> = ({ date }) => {
  const [orderDate, setOrderDate] = useState<null | string>(null);
  const { diffDate, setDate } = useDiffDate();

  function setLeadingZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  useEffect(() => {
    setDate(date);
  }, []);

  useEffect(() => {
    const orderDate: any = new Date(date);

    const hours: string = setLeadingZero(orderDate.getHours());
    const minutes: string = setLeadingZero(orderDate.getMinutes());
    const timeZone: any = (orderDate.getTimezoneOffset() * -1 / 60);

    setOrderDate(`${diffDate}, ${hours}:${minutes} i-GMT${timeZone > 0 ? '+' + timeZone : timeZone}`);
  }, [diffDate]);

  return (
    <p
      className={`text text_type_main-default text_color_inactive`}
    >
      {orderDate}
    </p>
  );
}
