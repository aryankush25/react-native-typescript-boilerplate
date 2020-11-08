import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Modal,
  View,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { CountriesTypes, searchCountries } from '../../utils/countryCodes';

const styles = StyleSheet.create({
  phoneNumberSelectorModalContainer: {
    paddingHorizontal: '4%',
    height: '92.3%',
  },
  backIconContainer: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  searchBarContainer: {
    paddingBottom: 12,
  },
  searchIconContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countryListContainer: {
    marginTop: 10,
  },
  countryListItemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  countryListItemUnicode: {
    fontSize: 20,
  },
  countryListItemNameContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

interface PhoneNumberSelectorModalTypes {
  isPhoneNumberSelectorModalOpen: boolean;
  toggleIsPhoneNumberSelectorModalOpen: Function;
  setCountryCode: Function;
}

interface CountryListItemTypes {
  item: CountriesTypes;
}

const PhoneNumberSelectorModal = ({
  isPhoneNumberSelectorModalOpen,
  toggleIsPhoneNumberSelectorModalOpen,
  setCountryCode,
}: PhoneNumberSelectorModalTypes) => {
  const [searchValue, setSearchValue] = useState('');

  const renderItem = useCallback(
    ({ item }: CountryListItemTypes) => (
      <Pressable
        style={styles.countryListItemContainer}
        onPress={() => {
          setCountryCode(item.iso2_cc);
          toggleIsPhoneNumberSelectorModalOpen();
          setSearchValue('');
        }}>
        <View>
          <Text style={styles.countryListItemUnicode}>{item.unicode}</Text>
        </View>

        <View style={styles.countryListItemNameContainer}>
          <Text>{item.name}</Text>
        </View>

        <View>
          <Text>+{item.e164_cc}</Text>
        </View>
      </Pressable>
    ),
    [setCountryCode, toggleIsPhoneNumberSelectorModalOpen],
  );

  const filteredCountryList = useMemo(() => searchCountries(searchValue), [
    searchValue,
  ]);

  return (
    <Modal animationType="slide" visible={isPhoneNumberSelectorModalOpen}>
      <SafeAreaView>
        <View style={styles.phoneNumberSelectorModalContainer}>
          <View style={styles.backIconContainer}>
            <Pressable onPress={() => toggleIsPhoneNumberSelectorModalOpen()}>
              <Icon name="arrow-left" size={22} color="black" />
            </Pressable>
          </View>

          <View style={styles.searchBarContainer}>
            <CustomTextInput
              value={searchValue}
              placeholder="Search by country name..."
              addsOnComponent={
                <View style={styles.searchIconContainer}>
                  <Icon name="search" size={22} color="black" />
                </View>
              }
              onChangeText={(text: string) => setSearchValue(text)}
            />
          </View>

          <Text style={styles.headingText}>Select your country</Text>

          <View style={styles.countryListContainer}>
            {filteredCountryList.length === 0 && (
              <Text>
                {`Sorry, we couldn't find results matching "${searchValue}"`}
              </Text>
            )}

            <FlatList
              data={filteredCountryList}
              renderItem={renderItem}
              keyExtractor={(item: CountriesTypes) =>
                item.iso2_cc + item.e164_cc
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default PhoneNumberSelectorModal;
