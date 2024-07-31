import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Gyroscope, GyroscopeMeasurement, Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import BleManager from "react-native-ble-manager";

export default function Index() {
  const [gyroData, setGyroData] = useState<GyroscopeMeasurement | null>(null);
  const [accelData, setAccelData] = useState<AccelerometerMeasurement | null>(null);
  
  const _subscribe = () => {
    Gyroscope.addListener((data) => {
      setGyroData(data);
    });

    Accelerometer.addListener((data) => {
      setAccelData(data);
    });
  };

  const _unsubscribe = () => {
    Gyroscope.removeAllListeners();
    Accelerometer.removeAllListeners();
    setGyroData(null);
    setAccelData(null);
  };

  useEffect(() => {
    Gyroscope.setUpdateInterval(100);
    Accelerometer.setUpdateInterval(100);

    Gyroscope.isAvailableAsync().then((available) => {
      if (available) {
        console.log('Gyroscope available');
      } else {
        console.log("Gyroscope not available");
      }
    }).catch((error) => {
      console.error(error);
    });

    Accelerometer.isAvailableAsync().then((available) => {
      if (available) {
        console.log('Accelerometer available');
      } else {
        console.log("Accelerometer not available");
      }
    }).catch((error) => {
      console.error(error);
    });

    // on unmount
    return () => _unsubscribe();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View >
        <Text>Gyroscope:</Text>
        {
          gyroData ? (
            <View>
              <Text>x: {gyroData.x}</Text>
              <Text>y: {gyroData.y}</Text>
              <Text>z: {gyroData.z}</Text>
            </View>
          ) : (
            <Text>No data</Text>
          )
        }
      </View>
      <View>
        <Text>Accelerometer:</Text>
        {
          accelData ? (
            <View>
              <Text>x: {accelData.x}</Text>
              <Text>y: {accelData.y}</Text>
              <Text>z: {accelData.z}</Text>
            </View>
          ) : (
            <Text>No data</Text>
          )
        }
      </View>
      <View>
        <TouchableOpacity 
          style={{
            backgroundColor: "blue",
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderCurve: 'circular',
            borderColor: 'black',
          }}        
          onPressIn={_subscribe}
          onPressOut={_unsubscribe}
        >
          <Text style={{color: 'white'}}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
