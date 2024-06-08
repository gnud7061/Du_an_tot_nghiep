import {View} from 'react-native';
import {styles} from './InputView.style';
import COLORS from '../../../constants/colors';

export default function InputView({icon, error, children}) {
  return (
    <>
      <View style={[styles.container, {borderColor: COLORS.black}]}>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            },
            styles.viewContainer,
          ]}>
          {children}
        </View>
        {icon && <TouchableOpacity>{icon}</TouchableOpacity>}
      </View>
      {error && <Text style={[styles.textColor]}></Text>}
    </>
  );
}
