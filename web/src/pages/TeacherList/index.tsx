import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="これらは利用可能なProffysです。">
        <form onSubmit={searchTeachers} id="search-teachers">
        <Select 
          name="subject" 
          label="主題"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          options={[
            { value: 'Artes', label: '芸術' },
            { value: 'Biologia', label: '生物学' },
            { value: 'Ciências', label: '科学' },
            { value: 'Educação Física', label: '学校体育' },
            { value: 'Física', label: '物理学' },
            { value: 'Geografia', label: '地理学' },
            { value: 'História', label: '歴史' },
            { value: 'Matemática', label: '数学' },
            { value: 'Português', label: 'ポルトガル語' },
            { value: 'Química', label: '化学' }
          ]}
        />
          <Select 
            name="week_day" 
            label="曜日"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: '日曜日' },
              { value: '1', label: '月曜日' },
              { value: '2', label: '火曜日' },
              { value: '3', label: '水曜日' },
              { value: '4', label: '木曜日' },
              { value: '5', label: '金曜日' },
              { value: '6', label: '土曜日' }
            ]}
        />
          <Input 
            type="time" 
            name="time" 
            label="時"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <button type="submit">探す</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
      </main>
    </div>
  );
}

export default TeacherList;