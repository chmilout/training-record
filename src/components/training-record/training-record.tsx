import { type FC, useState, type FormEvent, useRef } from 'react';
import { TrainingList } from '../training-list';
import { Form } from '../form';
import { type TData } from './types';
import { sortTrainingsByDate, generateId } from './utils';
import cn from './training-record.module.css';

export const TrainigRecord: FC = () => {
  const [inputsData, setInputsData] = useState<TData[]>([
    {
      id: '3',
      date: '16.09.25',
      distance: 12,
    },
    {
      id: '2',
      date: '15.09.25',
      distance: 8,
    },
    {
      id: '1',
      date: '14.09.25',
      distance: 10,
    },
  ]);
  const [formKey, setFormKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const newDate = String(data.date || '');
    const newDistance = Number(data.distance) || 0;

    if (editingId) {
      setInputsData((prev) => {
        const updatedList = prev.map((item) =>
          item.id === editingId
            ? { ...item, date: newDate, distance: newDistance }
            : item
        );

        return sortTrainingsByDate(updatedList);
      });
      setEditingId(null);
    } else {
      setInputsData((prev) => {
        const existingIndex = prev.findIndex((item) => item.date === newDate);

        let updatedList: TData[];

        if (existingIndex !== -1) {
          updatedList = prev.map((item, index) =>
            index === existingIndex
              ? { ...item, distance: item.distance + newDistance }
              : item
          );
        } else {
          const processedData: TData = {
            id: generateId(),
            date: newDate,
            distance: newDistance,
          };
          updatedList = [...prev, processedData];
        }

        return sortTrainingsByDate(updatedList);
      });
    }

    setFormKey((prev) => prev + 1);
  };

  const fillFormForEditing = (training: TData) => {
    setTimeout(() => {
      if (formRef.current) {
        const dateInput = formRef.current.elements.namedItem(
          'date'
        ) as HTMLInputElement;
        const distanceInput = formRef.current.elements.namedItem(
          'distance'
        ) as HTMLInputElement;

        if (dateInput && distanceInput) {
          dateInput.value = training.date;
          distanceInput.value = training.distance.toString();
        }
      }
    }, 0);

    setEditingId(training.id);
  };

  const handleDelete = (id: string) => {
    setInputsData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (training: TData) => {
    fillFormForEditing(training);
  };

  return (
    <div className={cn['training-record']}>
      <Form onSubmit={handleSubmit} formKey={formKey} ref={formRef} />
      <TrainingList
        list={inputsData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};
