// src/seed/seed-data.ts
import { MetricType } from 'src/types/metrics.enum';
import { WeekDay } from 'src/types/weekDay.enum';

export const initialData = {
  users: [
    {
      email: 'admin@test.com',
      password: 'Admin123',
      fullName: 'Admin User',
      medications: [
        { name: 'Aspirin', dosage: '500mg', notes: 'Drink with water' },
        { name: 'Vitamin D', dosage: '2000IU', notes: 'Take in the morning' },
        { name: 'Metformin', dosage: '850mg', notes: 'Take with meals' },
        { name: 'Lisinopril', dosage: '10mg', notes: 'Take in the morning' },
      ],
      schedules: [
        { medicationIndex: 0, time: '08:00', days: [WeekDay.MON, WeekDay.WED, WeekDay.FRI] },
        { medicationIndex: 1, time: '09:00', days: [WeekDay.TUE, WeekDay.THU, WeekDay.SAT] },
        { medicationIndex: 2, time: '07:00', days: [WeekDay.MON, WeekDay.TUE, WeekDay.WED, WeekDay.THU, WeekDay.FRI] },
        { medicationIndex: 3, time: '20:00', days: [WeekDay.MON, WeekDay.THU] },
      ],
      healthMetrics: [
        { type: MetricType.TEMPERATURE, value: 36.7, unit: '°C', date: '2026-03-31', time: '08:05' },
        { type: MetricType.TEMPERATURE, value: 36.6, unit: '°C', date: '2026-03-30', time: '08:05' },
        { type: MetricType.BLOOD_PRESSURE, value: 120, value2: 80, unit: 'mmHg', date: '2026-03-31', time: '08:10' },
        { type: MetricType.BLOOD_PRESSURE, value: 118, value2: 79, unit: 'mmHg', date: '2026-03-30', time: '08:10' },
        { type: MetricType.BLOOD_GLUCOSE, value: 95, unit: 'mg/dL', date: '2026-03-31', time: '08:15' },
        { type: MetricType.BLOOD_GLUCOSE, value: 100, unit: 'mg/dL', date: '2026-03-30', time: '08:15' },
        { type: MetricType.BLOOD_GLUCOSE, value: 105, unit: 'mg/dL', date: '2026-03-30', time: '20:00' },
      ],
    },
    {
      email: 'user@test.com',
      password: 'User123',
      fullName: 'Normal User',
      medications: [
        { name: 'Ibuprofen', dosage: '400mg', notes: 'Take with food' },
        { name: 'Calcium', dosage: '500mg', notes: 'Take with meals' },
        { name: 'Insulin', dosage: '10 units', notes: 'Once a day' },
      ],
      schedules: [
        { medicationIndex: 0, time: '08:00', days: [WeekDay.MON, WeekDay.TUE, WeekDay.WED, WeekDay.THU, WeekDay.FRI] },
        { medicationIndex: 0, time: '20:00', days: [WeekDay.MON, WeekDay.TUE, WeekDay.WED, WeekDay.THU, WeekDay.FRI] },
        { medicationIndex: 1, time: '12:00', days: [WeekDay.MON, WeekDay.WED, WeekDay.FRI] },
        { medicationIndex: 2, time: '07:00', days: [WeekDay.MON, WeekDay.TUE, WeekDay.WED, WeekDay.THU, WeekDay.FRI] },
      ],
      healthMetrics: [
        { type: MetricType.TEMPERATURE, value: 36.8, unit: '°C', date: '2026-03-31', time: '07:30' },
        { type: MetricType.TEMPERATURE, value: 36.5, unit: '°C', date: '2026-03-30', time: '07:30' },
        { type: MetricType.BLOOD_PRESSURE, value: 115, value2: 75, unit: 'mmHg', date: '2026-03-31', time: '08:00' },
        { type: MetricType.BLOOD_PRESSURE, value: 117, value2: 76, unit: 'mmHg', date: '2026-03-30', time: '08:00' },
        { type: MetricType.BLOOD_GLUCOSE, value: 90, unit: 'mg/dL', date: '2026-03-31', time: '07:45' },
        { type: MetricType.BLOOD_GLUCOSE, value: 92, unit: 'mg/dL', date: '2026-03-30', time: '07:45' },
        { type: MetricType.BLOOD_GLUCOSE, value: 98, unit: 'mg/dL', date: '2026-03-30', time: '20:00' },
      ],

    },
  ],
};

