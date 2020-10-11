import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { Provider } from './types';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

interface routeParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const route = useRoute();
  const { providerId } = route.params as routeParams;
  const [selectedProvider, setSelectedProvider] = useState<string>(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { user } = useAuth();

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const { goBack } = useNavigation();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback(
    (newSelectedProviderId: string) => {
      setSelectedProvider(newSelectedProviderId);
    },
    [setSelectedProvider],
  );

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, [setShowDatePicker]);

  const handleDateChange = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
      if (date) {
        setSelectedDate(date);
      }
    },
    [setShowDatePicker, setSelectedDate],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
          <HeaderTitle>Cabeleireiros</HeaderTitle>
        </BackButton>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={selectedProvider === provider.id}
              onPress={() => handleSelectProvider(provider.id)}>
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={selectedProvider === provider.id}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            is24Hour
            display="calendar"
            // textColor="#f4ede8"
            onChange={handleDateChange}
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
