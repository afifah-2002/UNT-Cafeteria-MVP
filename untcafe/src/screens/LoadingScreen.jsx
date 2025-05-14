// import React, { useEffect } from 'react';
// import { View, Image, Dimensions, StatusBar } from 'react-native';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, withRepeat, Easing } from 'react-native-reanimated';
// import styles from '../styles/LoadingStyles';

// const LoadingComponent = () => {

//     // This will be the initial state 
//     const logoScale = useSharedValue(1.0);
//     const logoOpacity = useSharedValue(1);

//     // animation effect
//     const animatedLogoStyle = useAnimatedStyle(() => ({
//         transform: [
//             { translateX: 0 },
//             { scale: logoScale.value },
//         ],
//         opacity: logoOpacity.value,
//     }));


//     useEffect(() => {

//         logoScale.value = withDelay(
//             500,
//             withRepeat(
//                 withSequence(
//                     // 2 small pulse
//                     withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }), // Scale up
//                     withTiming(1.0, { duration: 250, easing: Easing.inOut(Easing.ease) }), // Scale down
//                     withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }), // Scale up
//                     withTiming(1.0, { duration: 250, easing: Easing.inOut(Easing.ease) }), // Scale down
//                     //break pulse
//                     withTiming(1.0, { duration: 400, easing: Easing.linear }), // No scale change
//                     // 2 small pulse
//                     withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }), // Scale up
//                     withTiming(1.0, { duration: 250, easing: Easing.inOut(Easing.ease) }), // Scale down
//                     withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }), // Scale up
//                     withTiming(1.0, { duration: 650, easing: Easing.inOut(Easing.ease) }), // Scale down

//                 ),
//                 1,
//                 true
//             )
//         );


//         logoOpacity.value = withDelay(
//             2800,
//             withTiming(0, { duration: 1000, easing: Easing.linear })
//         );
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
//                 <Image source={require('../../assets/images/eagleLogo.png')} style={styles.logo} />
//             </Animated.View>
//         </View>
//     );
// };

// export default LoadingComponent;

import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/LoadingStyles';

const LoadingComponent = () => {
  const navigation = useNavigation();
  const logoScale = useSharedValue(1.0);
  const logoOpacity = useSharedValue(1);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  useEffect(() => {
    logoScale.value = withDelay(
      500,
      withRepeat(
        withSequence(
          withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 250, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 250, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 400, easing: Easing.linear }),
          withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 250, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.01, { duration: 250, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.0, { duration: 650, easing: Easing.inOut(Easing.ease) })
        ),
        1,
        true
      )
    );

    logoOpacity.value = withDelay(
      2800,
      withTiming(0, { duration: 1000, easing: Easing.linear }, (finished) => {
        if (finished) {
          runOnJS(navigateToHome)();
        }
      })
    );
  }, []);

  const navigateToHome = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Image source={require('../../assets/images/eagleLogo.png')} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

export default LoadingComponent;
