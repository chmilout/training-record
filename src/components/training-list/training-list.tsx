import { type FC } from 'react';
import { type TData } from '../training-record/types';
import cn from './training-list.module.css';

type TTrainingList = {
  list: TData[];
  onDelete?: (id: string) => void;
  onEdit?: (training: TData) => void;
};

export const TrainingList: FC<TTrainingList> = ({ list, onDelete, onEdit }) => {
  return (
    <div className={cn['list']}>
      <div className={cn['training-header']}>
        <div>Дата</div>
        <div>Пройдено км</div>
        <div>Действие</div>
      </div>
      <div className={cn['training-list']}>
        {list.map(({ id, date, distance }) => (
          <div className={cn['training-item']} key={id}>
            <div>{date}</div>
            <div>{distance}</div>
            <div className={cn['button-wrapper']}>
              <button
                className={cn['action-button']}
                onClick={() => onEdit?.({ id, date, distance })}
              >
                Edit
              </button>
              <button
                className={cn['action-button']}
                onClick={() => onDelete?.(id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
