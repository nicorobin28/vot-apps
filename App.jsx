import React, {useEffect, useState} from 'react';
import notifee, {EventType} from '@notifee/react-native';
import {
  Animated,
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import SplashScreen from './components/SplashScreen';
import HomePage from './components/HomePage';
import TechnicMenu from './components/TechnicMenu';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ServisMenu from './components/ServisMenu';
import PassingAtasMenu from './components/PassingAtasMenu';
import PassingBawahMenu from './components/PassingBawah/PassingBawahMenu';
import UnderhandServePage from './components/UnderhandServePage';
import PaTanpaBola from './components/PaTanpaBola';
import PaTanpaBolaP from './components/PaTanpaBolaP';
import PaDenganBola from './components/PaDenganBola';
import OverHandServe from './components/OverhandServe';
import JumpServeFloating from './components/JumpServeFloating';
import JumpServeSpin from './components/JumpServeSpin';
import FokusTeknikTanpaBola from './components/PassingBawah/FokusTeknikTanpaBola';
import LatihanTanpaBola from './components/PassingBawah/LatihanTanpaBola';
import LatihanDenganBola from './components/PassingBawah/LatihanDenganBola';
import BlockingMenu from './components/Blocking/BlockingMenu';
import BkFokusTeknikTanpaBola from './components/Blocking/BkFokusTeknikTanpaBola';
import BkLatihanTanpaBola from './components/Blocking/BkLatihanTanpaBola';
import BkLatihanDenganBola from './components/Blocking/BkLatihanDenganBola';
import SpikeMenu from './components/Spike/SpikeMenu';
import SpFokusTeknikTanpaBola from './components/Spike/SpFokusTeknikTanpaBola';
import SpLatihanDenganBola from './components/Spike/SpLatihanDenganBola';
import SpLatihanTanpaBola from './components/Spike/SpLatihanTanpaBola';
import PhysiqueMenu from './components/PhysiqueMenu';
import EnduranceMenu from './components/EnduranceMenu';
import Aerobik from './components/Aerobik';
import AnAerobik from './components/AnAerobik';
import Agility from './components/Agility';
import Speed from './components/Speed';
import Flexibility from './components/Flexibility';
import Coordination from './components/Coordination';
import Power from './components/Power';
import UpperBody from './components/UpperBody';
import LowerBody from './components/LowerBody';
import FullBody from './components/FullBody';
import Strength from './components/Strength';
import Weightlifting from './components/Weightlifting';
import Onbodyweight from './components/Onbodyweight';
import Tabata from './components/Tabata';
import LatihanBaru from './components/LatihanBaru';
import Latihantriceps from './components/Latihantriceps';
import Latihanbiceps from './components/Latihanbiceps';
import Latihandada from './components/Latihandada';
import Latihanpunggung from './components/Latihanpunggung';
import Latihanpinggang from './components/Latihanpinggang';
import Latihanperut from './components/Latihanperut';
import Latihanpahadepan from './components/Latihanpahadepan';
import Latihanpahabelakang from './components/Latihanpahabelakang';
import Latihanbetis from './components/Latihanbetis';
import Latihanbahu from './components/Latihanbahu';
import Latihantricepsonobw from './components/Latihantricepsonobw';
import Latihandadaonobw from './components/Latihandadaonobw';
import Latihanpunggungonobw from './components/Latihanpunggungonobw';
import Latihanpinggangonobw from './components/Latihanpinggangonobw';
import Latihanperutonobw from './components/Latihanperutonobw';
import Latihanpahadepanonobw from './components/Latihanpahadepanonobw';
import Latihanpahabelakangonobw from './components/Latihanpahabelakangonobw';
import Latihanbetisonobw from './components/Latihanbetisonobw';
import LatihanForearm from './components/LatihanForearm';
import CreateSchedulePage from './components/CreateSchedulePage';
import ScheduleForm from './components/ScheduleForm';
import PreviewSchedulePage from './components/PreviewSchedulePage';
import LatihanDetailScreen from './components/LatihanDetailScreen';
import CustomLatihanPage from './components/CustomLatihanPage';
import SchedulePage from './components/SchedulePage';
import PreviewHistoryPage from './components/PreviewHistoryPage';
import {navigationRef, navigate} from './components/NavigationService';
import FlashMessage from 'react-native-flash-message';
import {getDBConnection, createTable} from './connection/Database';
import VersionInfoScreen from './components/VersionInfoScreen';
import MaterialsChoicePage from './components/MaterialsMenu/MaterialsChoicePage';
import PdfToDownloadFolder from './components/PdfToDownloadFolder';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const initDb = async () => {
      try {
        const db = await getDBConnection();
        await createTable(db);
        console.log('Database Initialized');
      } catch (error) {
        console.log('Failed to initialized DB : ', error);
      }
    };

    initDb();

    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        const {sessionId} = detail.notification?.data || {};
        if (sessionId) {
          navigate('LatihanDetail', {
            sessionId: parseInt(sessionId),
          });
        }
      }
    });

    async function checkInitialNotification() {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        const {sessionId} = initialNotification.notification?.data || {};
        if (sessionId) {
          navigate('LatihanDetail', {sessionId: parseInt(sessionId)});
        }
      }
    }

    checkInitialNotification();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Animated.View style={{flex: 1, opacity: fadeAnim}}>
      <FlashMessage position="top" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="home" component={HomePage} />
          <Stack.Screen name="technical" component={TechnicMenu} />
          <Stack.Screen name="servisMenu" component={ServisMenu} />
          <Stack.Screen name="passingAtasMenu" component={PassingAtasMenu} />
          <Stack.Screen name="passingBawahMenu" component={PassingBawahMenu} />
          <Stack.Screen name="blockingMenu" component={BlockingMenu} />
          <Stack.Screen name="spikeMenu" component={SpikeMenu} />
          <Stack.Screen name="paTanpaBola" component={PaTanpaBola} />
          <Stack.Screen name="paTanpaBolaP" component={PaTanpaBolaP} />
          <Stack.Screen name="paDenganBola" component={PaDenganBola} />
          <Stack.Screen name="overHandServe" component={OverHandServe} />
          <Stack.Screen
            name="jumpServeFloating"
            component={JumpServeFloating}
          />
          <Stack.Screen name="jumpServeSpin" component={JumpServeSpin} />
          <Stack.Screen
            name="underhandServePage"
            component={UnderhandServePage}
          />
          <Stack.Screen
            name="fokusTeknikTanpaBola"
            component={FokusTeknikTanpaBola}
          />
          <Stack.Screen name="latihanTanpaBola" component={LatihanTanpaBola} />
          <Stack.Screen
            name="latihanDenganBola"
            component={LatihanDenganBola}
          />
          <Stack.Screen
            name="bkFokusTeknikTanpaBola"
            component={BkFokusTeknikTanpaBola}
          />
          <Stack.Screen
            name="bkLatihanTanpaBola"
            component={BkLatihanTanpaBola}
          />
          <Stack.Screen
            name="bkLatihanDenganBola"
            component={BkLatihanDenganBola}
          />
          <Stack.Screen
            name="spFokusTeknikTanpaBola"
            component={SpFokusTeknikTanpaBola}
          />
          <Stack.Screen
            name="spLatihanDenganBola"
            component={SpLatihanDenganBola}
          />
          <Stack.Screen
            name="spLatihanTanpaBola"
            component={SpLatihanTanpaBola}
          />
          <Stack.Screen name="physiqueMenu" component={PhysiqueMenu} />
          <Stack.Screen name="enduranceMenu" component={EnduranceMenu} />
          <Stack.Screen name="aerobik" component={Aerobik} />
          <Stack.Screen name="anAerobik" component={AnAerobik} />
          <Stack.Screen name="agility" component={Agility} />
          <Stack.Screen name="strTest" component={Strength} />
          <Stack.Screen name="speed" component={Speed} />
          <Stack.Screen name="flexibility" component={Flexibility} />
          <Stack.Screen name="coordination" component={Coordination} />
          <Stack.Screen name="power" component={Power} />
          <Stack.Screen name="upperBody" component={UpperBody} />
          <Stack.Screen name="lowerBody" component={LowerBody} />
          <Stack.Screen name="fullBody" component={FullBody} />
          <Stack.Screen name="weightlifting" component={Weightlifting} />
          <Stack.Screen name="onbodyweight" component={Onbodyweight} />
          <Stack.Screen name="tabata" component={Tabata} />
          <Stack.Screen name="latihanbaru" component={LatihanBaru} />
          <Stack.Screen name="latihantriceps" component={Latihantriceps} />
          <Stack.Screen name="latihanbiceps" component={Latihanbiceps} />
          <Stack.Screen name="latihandada" component={Latihandada} />
          <Stack.Screen name="latihanpunggung" component={Latihanpunggung} />
          <Stack.Screen name="latihanpinggang" component={Latihanpinggang} />
          <Stack.Screen name="latihanperut" component={Latihanperut} />
          <Stack.Screen name="latihanpahadepan" component={Latihanpahadepan} />
          <Stack.Screen
            name="latihanpahabelakang"
            component={Latihanpahabelakang}
          />
          <Stack.Screen name="latihanbetis" component={Latihanbetis} />
          <Stack.Screen name="latihanbahu" component={Latihanbahu} />
          <Stack.Screen
            name="latihantricepsonobw"
            component={Latihantricepsonobw}
          />
          <Stack.Screen name="latihandadaonobw" component={Latihandadaonobw} />
          <Stack.Screen
            name="latihanpunggungonobw"
            component={Latihanpunggungonobw}
          />
          <Stack.Screen
            name="latihanpinggangonobw"
            component={Latihanpinggangonobw}
          />
          <Stack.Screen
            name="latihanperutonobw"
            component={Latihanperutonobw}
          />
          <Stack.Screen
            name="latihanpahadepanonobw"
            component={Latihanpahadepanonobw}
          />
          <Stack.Screen
            name="latihanpahabelakangonobw"
            component={Latihanpahabelakangonobw}
          />
          <Stack.Screen
            name="latihanbetisonobw"
            component={Latihanbetisonobw}
          />
          <Stack.Screen name="latihanforearm" component={LatihanForearm} />
          <Stack.Screen
            name="createSchedulePage"
            component={CreateSchedulePage}
          />
          <Stack.Screen
            name="previewSchedulePage"
            component={PreviewSchedulePage}
          />
          <Stack.Screen name="LatihanDetail" component={LatihanDetailScreen} />
          <Stack.Screen name="scheduleForm" component={ScheduleForm} />
          <Stack.Screen
            name="customLatihanPage"
            component={CustomLatihanPage}
          />
          <Stack.Screen name="schedulePage" component={SchedulePage} />
          <Stack.Screen
            name="previewHistoryPage"
            component={PreviewHistoryPage}
          />
          <Stack.Screen
            name="versionInfoScreen"
            component={VersionInfoScreen}
          />
          <Stack.Screen
            name="materialsChoicePage"
            component={MaterialsChoicePage}
          />
          <Stack.Screen
            name="pdfToDownloadFolder"
            component={PdfToDownloadFolder}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Animated.View>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <AppNavigator />
  );
};

export default App;
