import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

const Inventory = () => {
  let [inventory, setInventory] = useState([]);
  let [refreshing, setRefreshing] = useState(false);
  let [spinner, setSpinner] = useState(true);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      getInventory();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const getInventory = () => {
    fetch('http://192.168.1.56:8000/api/EquipmentEssential/1/1')
      .then(response => response.json())
      .then(json => setInventory(Object.values(json['hydra:member'])))
      .then(setSpinner(false))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      {spinner ? (
        <ActivityIndicator />
      ) : (
        <>
          {inventory ? (
            <View>
              <Text style={styles.title}>Materiali da utilizzare oggi</Text>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <View style={styles.view}>
                  <Text style={styles.titleTwo}>
                    MATERIALI PRESENTI SUL FURGONE
                  </Text>
                  {inventory.map(item => {
                    return item.availability === 'CARICATO' ? (
                      <View
                        style={{
                          ...styles.row,
                          borderBottomWidth: 1,
                          borderBottomColor: '#D9D9D9',
                          padding: 7,
                        }}
                        key={item.id}>
                        <View style={{ flex: 3 }}>
                          <Text style={styles.textOne}>{item.description}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                          <Text style={styles.textTwo}>
                            Q.t??: {item.quantity}
                          </Text>
                        </View>

                        <View
                          style={{
                            ...styles.row,
                            flex: 1,
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{ ...styles.textThree, color: '#26BA85' }}>
                            {item.availability}
                          </Text>
                        </View>
                      </View>
                    ) : null;
                  })}

                  <Text style={{ ...styles.titleTwo, marginTop: 35 }}>
                    MATERIALI DA CARICARE
                  </Text>

                  {inventory.map(item => {
                    return item.availability === 'DA CARICARE' ? (
                      <View
                        style={{
                          ...styles.row,
                          borderBottomWidth: 1,
                          borderBottomColor: '#D9D9D9',
                          padding: 7,
                        }}
                        key={item.id}>
                        <View style={{ flex: 3 }}>
                          <Text style={styles.textOne}>{item.description}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                          <Text style={styles.textTwo}>
                            Q.t??: {item.quantity}
                          </Text>
                        </View>

                        <View
                          style={{
                            ...styles.row,
                            flex: 1,
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{ ...styles.textThree, color: '#26C6DA' }}>
                            {item.availability}
                          </Text>
                        </View>
                      </View>
                    ) : null;
                  })}
                </View>
              </ScrollView>
            </View>
          ) : null}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 22,
    color: '#000000',
  },
  view: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  titleTwo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#676D81',
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  loadText: {
    fontSize: 14,
    fontWeight: 'bold',
    underline: { textDecorationLine: 'underline' },
  },
  textOne: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  textTwo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#676D81',
  },
  textThree: {
    fontSize: 14,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Inventory;
