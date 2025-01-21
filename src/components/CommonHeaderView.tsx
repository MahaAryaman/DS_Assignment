import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Image,
  TextInput,
  TextStyle,
} from 'react-native';
import {AppContext} from '../../context/AppProvider';
import {useAppSelector} from '../../hooks/reduxHook';
import {
  AppImages,
  BackArrowIcon,
  SearchIcon,
  Iconadd,
  Filter_alt,
  CartIcon,
  BharatBillPayIconHeader,
  GeneralInfoIcon,
} from '../../resources/assets/constant';
import Mixins from '../../resources/mixins/appStyle';
import Colors from '../../resources/theme/color';
import Fonts from '../../resources/theme/font';
import CommonButton from '../CommonButton';
import {IRightButtonProps} from '../TopRoundedView';
import {InfoButtonProps, VoiceButtonProps} from '../TopRoundedView';
import LinearGradient from 'react-native-linear-gradient';
import {StatusBar} from 'react-native';

interface CustomHeaderViewProps {
  showSearch?: boolean;
  title: string;
  navigation?: any;
  isModal?: boolean;
  disableGoBack?: boolean;
  headerStyle?: StyleProp<ViewStyle> | undefined;
  onBackButtonPress?: () => void;
  onChangeText?: ((text: string) => void) | undefined;
  onModalBackPress?: () => void;
  image: boolean;
  onIconPress?: () => void;
  EditonPress?: () => void;
  onPressFilter?: () => void;
  onPressClearall?: () => void;
  imageStyle?: any;
  iconadd?: boolean;
  filteralt?: boolean;
  tefttext?: string;
  Clearall?: string;
  isBookTicketAvailable?: boolean;
  onBookTicketPress?: () => void;
  showCart?: boolean;
  rightButton?: IRightButtonProps;
  showBBPSIcon?: boolean;
  showInfoIcon?: InfoButtonProps;
  showVoiceIcon?: VoiceButtonProps;

  showCarbonEmission?: boolean;
}

const {scaleSize, scaleFont, screenWidth} = Mixins;

const CommonHeaderView = ({
  title,
  tefttext,
  Clearall,
  navigation,
  showSearch = false,
  isModal = false,
  headerStyle,
  onChangeText,
  onModalBackPress,
  onBackButtonPress,
  image = false,
  iconadd = false,
  filteralt = false,
  imageStyle,
  onIconPress,
  EditonPress,
  onPressFilter,
  onPressClearall,
  disableGoBack = false,
  isBookTicketAvailable = false,
  showCart = false,
  rightButton,
  onBookTicketPress,
  showBBPSIcon = false,
  showInfoIcon,
  showVoiceIcon,
  showTranslateIcon,
  showCarbonEmission = false,
}: CustomHeaderViewProps) => {
  const onBackPress = () => {
    !!onBackButtonPress && onBackButtonPress();
    !disableGoBack && navigation?.goBack();
  };

  const [isSearchViewOpen, setSearchView] = React.useState(false);
  const {translate, netInfo} = React.useContext(AppContext);
  const isOnline = netInfo
    ? netInfo.isConnected && netInfo.isInternetReachable
    : false;

  const cartItems = useAppSelector(state => state.cart.cartItems);
  const profile = useAppSelector(state => state.getProfile.profile);

  const onSearchPress = () => {
    !!onChangeText && onChangeText('');
    setSearchView(!isSearchViewOpen);
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[Colors.gradientTop(), Colors.gradientBottom()]}
      style={[styles.container, headerStyle]}>
      <StatusBar backgroundColor={Colors.gradientTop()} />
      <View style={styles.leftView}>
        <TouchableOpacity
          style={styles.button}
          onPress={isModal ? onModalBackPress : onBackPress}>
          <BackArrowIcon />
        </TouchableOpacity>
        {showSearch && isSearchViewOpen ? (
          <View
            style={[
              styles.searchView,
              showBBPSIcon && styles.searchReduceWidth,
            ]}>
            <View style={styles.searchInputView}>
              <>
                <SearchIcon />
                <TextInput
                  style={styles.input}
                  autoFocus
                  onChangeText={onChangeText}
                  selectionColor={Colors.white()}
                />
              </>
              <TouchableOpacity
                style={styles.crossButton}
                // iconaddiconadd
                onPress={onSearchPress}>
                <Text style={styles.cross}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.titleButton}
            onPress={
              showSearch
                ? onSearchPress
                : isModal
                ? onModalBackPress
                : onBackPress
            }>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )}
      </View>
      {showSearch && !isSearchViewOpen && (
        <TouchableOpacity style={styles.button} onPress={onSearchPress}>
          <SearchIcon />
        </TouchableOpacity>
      )}
      {image && (
        <TouchableOpacity style={styles.button} onPress={onIconPress}>
          <Image source={AppImages.metro_red} style={styles.imageStyle} />
        </TouchableOpacity>
      )}
      {showCarbonEmission && (
        <View style={styles.leaf}>
          <View style={{marginRight: 5}}>
            <Text style={styles.title}>{translate('carbonEmission')}</Text>
            <Text style={styles.title}>
              {translate('savedInG').replace(
                'XXX',
                profile?.data?._doc?.totalCarbonEmission || `${0}`,
              )}
            </Text>
          </View>
          <Image source={AppImages.leaf} style={styles.leafStyle} />
        </View>
      )}
      {iconadd && (
        <TouchableOpacity
          onPress={EditonPress}
          style={styles.button}
          activeOpacity={0.6}>
          <Iconadd />
        </TouchableOpacity>
      )}
      {filteralt && (
        <TouchableOpacity
          onPress={onPressFilter}
          style={styles.button}
          activeOpacity={0.6}>
          <Filter_alt />
        </TouchableOpacity>
      )}
      {tefttext && (
        <TouchableOpacity
          onPress={() => console.warn('ssss')}
          style={styles.button}
          activeOpacity={0.6}>
          <Text style={styles.Share}>{tefttext}</Text>
        </TouchableOpacity>
      )}

      {Clearall && (
        <TouchableOpacity
          onPress={onPressClearall}
          style={styles.Clearall_view}
          activeOpacity={0.6}>
          <Text style={styles.Clearall}>{Clearall}</Text>
        </TouchableOpacity>
      )}
      {isBookTicketAvailable && (
        <CommonButton
          title={translate('bookTicket')}
          style={styles.bookTicket}
          onButtonPress={onBookTicketPress}
        />
      )}
      {showCart && (
        <TouchableOpacity onPress={() => navigation.navigate('CartList')}>
          <View style={styles.button}>
            <CartIcon />
          </View>
          {cartItems?.length > 0 && (
            <View style={styles.badgeView}>
              <Text style={styles.badge}>{cartItems?.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      {rightButton && (
        <TouchableOpacity
          onPress={() => rightButton.onPress && rightButton.onPress()}
          style={[styles.Clearall_view, rightButton.buttonStyle]}
          activeOpacity={0.6}>
          <Text style={[styles.Clearall, rightButton.textStyle]}>
            {rightButton.text}
          </Text>
        </TouchableOpacity>
      )}
      {showBBPSIcon && (
        <View style={styles.bppsIcon}>
          <BharatBillPayIconHeader />
        </View>
      )}
      {showInfoIcon && (
        <TouchableOpacity
          onPress={() => showInfoIcon.onPress && showInfoIcon.onPress()}
          style={[styles.bppsIcon, {marginRight: 10}]}>
          <GeneralInfoIcon />
        </TouchableOpacity>
      )}

      {showVoiceIcon && isOnline && !isSearchViewOpen && (
        <TouchableOpacity
          onPress={() => showVoiceIcon.onPress && showVoiceIcon.onPress()}
          style={[styles.bppsIcon, {marginRight: 10}]}>
          <Image
            style={{width: scaleSize(35), height: scaleSize(35)}}
            source={AppImages.VoiceBtn}
          />
        </TouchableOpacity>
      )}
      {showTranslateIcon && (
        <TouchableOpacity
          onPress={() =>
            showTranslateIcon.onPress && showTranslateIcon.onPress()
          }
          style={[styles.bppsIcon, {marginRight: 10}]}>
          <Image
            source={AppImages.LanguageSwitchIcon}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default CommonHeaderView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleSize(6),
    height: scaleSize(90),
    paddingBottom: scaleSize(10),
    width: '100%',
  },
  leftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchView: {
    width: screenWidth - scaleSize(60),
    marginLeft: scaleSize(10),
    height: scaleSize(40),
  },
  searchReduceWidth: {
    width: screenWidth - scaleSize(100),
  },
  searchInputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: scaleSize(20),
    height: scaleSize(50),
    fontFamily: Fonts.poppinsRegular,
    fontSize: scaleFont(16),
    color: Colors.white(),
  },
  button: {
    padding: scaleSize(10),
  },
  crossButton: {
    width: scaleSize(30),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cross: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: scaleFont(24),
    color: Colors.white(),
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray8(),
  },
  titleButton: {
    flex: 1,
    marginHorizontal: scaleSize(10),
  },
  title: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: scaleFont(16),
    color: Colors.white(),
    maxWidth: '100%',
    maxHeight: '100%',
  },
  imageStyle: {
    height: scaleSize(37),
    width: scaleSize(37),
    // resizeMode:'conten'
    resizeMode: 'contain',
  },
  leafStyle: {
    height: scaleSize(45),
    width: scaleSize(45),
    // resizeMode:'conten'
    resizeMode: 'contain',
  },
  leaf: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Share: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: scaleFont(18),
    color: Colors.blue1(),
  },
  Clearall: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: scaleFont(18),
    color: Colors.white(),
  },
  Clearall_view: {
    right: 10,
  },
  bookTicket: {
    paddingHorizontal: scaleSize(20),
    width: '30%',
  },
  badgeView: {
    backgroundColor: Colors.white(),
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingHorizontal: scaleSize(6),
    paddingVertical: scaleSize(2),
    borderRadius: scaleSize(10),
  },
  badge: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: scaleFont(12),
    color: Colors.black2(),
  },
  bppsIcon: {
    padding: scaleSize(10),
  },
});
