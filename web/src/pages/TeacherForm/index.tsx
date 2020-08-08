import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ]);
  
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: ''},
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('登録に成功しました。');
      history.push('/');
    }).catch(() => {
      alert('登録エラー。');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="教えたいなんてすごい。"
        description="最初のステップは、この申し込みフォームに記入することです。"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>あなたのデータ</legend>
            <Input 
              name="name" 
              label="フルネーム"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              name="avatar" 
              label="アバター"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input 
              name="whatsapp" 
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea 
              name="bio" 
              label="バイオグラフィー"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>クラスについて</legend>
            <Select 
              name="subject" 
              label="主題"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
            <Input 
              name="cost" 
              label="クラスあたりの時間のコスト"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              利用可能な時間
              <button type="button" onClick={addNewScheduleItem}>
                + 新しい時間
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="曜日"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                    name="from" 
                    label="から" 
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input 
                    name="to" 
                    label="に" 
                    type="time"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="重要な警告"/>
              重要！ <br/>
              すべてのデータを入力します。
            </p>
            <button type="submit">登録を保存</button>
          </footer>
        </form>

      </main>
    </div>
  );
}

export default TeacherForm;