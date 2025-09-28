import { type FC, type FormEvent, type RefObject } from 'react';
import Cleave from 'cleave.js/react';
import cn from './form.module.css';

type TForm = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formKey: number;
  ref: RefObject<HTMLFormElement | null>;
};

export const Form: FC<TForm> = ({ onSubmit, formKey, ref }) => {
  return (
    <form ref={ref} className={cn['form']} onSubmit={onSubmit} key={formKey}>
      <div className={cn['field-wrapper']}>
        <label>Дата (ДД.ММ.ГГ)</label>
        <Cleave
          className={cn['field-input']}
          name="date"
          type="text"
          placeholder="дд.мм.гг"
          options={{
            date: true,
            delimiter: '.',
            datePattern: ['d', 'm', 'y'],
          }}
        />
      </div>
      <div className={cn['field-wrapper']}>
        <label>Пройдено км</label>
        <Cleave
          className={cn['field-input']}
          name="distance"
          type="number"
          options={{
            numeral: true,
            numeralThousandsGroupStyle: 'none',
            numeralPositiveOnly: true,
          }}
          placeholder="0"
        />
      </div>
      <button className={cn['submit-btn']} type="submit">
        Ок
      </button>
    </form>
  );
};
