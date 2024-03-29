import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { APP_COLOR, HEIGHT, WIDTH } from '../constants/constants';
import { AboutUs } from '../components/AboutUs';
import { TermAndCondition } from '../components/TermAndCondition';
import { BottomSheet } from 'react-native-btr';
import { Context } from '../contexts/ApplicationContext';
import { AppActivityIndictor } from '../components/AppActivityIndictor';

const AccountScreen = ({ navigation }) => {

    const { state, signout } = useContext(Context);
    const { user } = state;

    // useEffect(()=>{
    //     console.log({state})
    // }, [])

    const [aboutusVisibiity, setAboutusVisiblity] = useState(false);
    const [termandConditionVisibiity, setTermandConditionVisibiity] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={require('../../assets/construction.png')}
                // source={{ uri: user.avatar }}
                />
                <View>
                    <Text style={styles.names}>{user.fname}</Text>
                    <Text style={styles.names}>{user.lname}</Text>
                    <View style={styles.userTypeCard}>
                        <Text style={styles.userType}>{user.userType === 0 ? "Owner" : "Employee"}</Text>
                    </View>
                </View>
            </View>

            <View >
                <TouchableOpacity
                    onPress={() => setAboutusVisiblity(true)}
                    style={styles.button}
                >
                    <Text style={styles.buttonTitle}>About</Text>
                    <Text style={styles.buttonDescription}>Know who we are</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setTermandConditionVisibiity(true)}
                    style={styles.button}
                >
                    <Text style={styles.buttonTitle}>Term and Conditions</Text>
                    <Text style={styles.buttonDescription}>important for both of us</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonTitle}>Support</Text>
                    <Text style={styles.buttonDescription}>get help from our team</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setShowActivityIndicator(true);

                        signout(state.user.token, () => {
                            setShowActivityIndicator(false);
                            navigation.navigate("Signin")
                        })
                    }}
                >
                    <Text style={styles.buttonTitle}>Sign out</Text>
                    <Text style={styles.buttonDescription}>@ {user.fname} {user.lname}</Text>
                </TouchableOpacity>
            </View>

            <BottomSheet visible={aboutusVisibiity}>
                <AboutUs changeVisibility={() => setAboutusVisiblity(false)} />
            </BottomSheet>

            <BottomSheet visible={termandConditionVisibiity}>
                <TermAndCondition changeVisibility={() => setTermandConditionVisibiity(false)} />
            </BottomSheet>

            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: WIDTH - 60,
        marginBottom: HEIGHT * .05
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginRight: 20
    },
    button: {
        width: WIDTH - 60,
        borderBottomColor: 'grey',
        borderBottomWidth: .5
    },
    names: {
        fontWeight: 'bold',
        fontSize: 18
    },
    userTypeCard: {
        backgroundColor: APP_COLOR,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    userType: {

    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15
    },
    buttonDescription: {
        color: 'grey',
        fontSize: 14,
        marginBottom: 15
    }

});

export default AccountScreen;