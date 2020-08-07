import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )
  
  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }
  
  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24
        }}
      >
        {favorites.map((teacher: Teacher) => (
          <TeacherItem 
            key={teacher.id}
            teacher={teacher}
            favorited={true}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;