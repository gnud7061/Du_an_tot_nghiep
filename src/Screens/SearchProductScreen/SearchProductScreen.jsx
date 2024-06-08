import React from "react";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import HeaderTitle from "../../components/atoms/HeaderTitle/HeaderTitle";
import IconI from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from "../../constants/colors";
import { API_CATEGORY_PRODUCT } from "../../config/api-consts";
import { API_PRODUCT } from "../../config/api-consts";
import { User } from '../../hooks/useContext';


const SearchProductScreen = ({navigation}) => {
    const { userData } = User();
    const [dataProduct, setDataProduct] = React.useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    React.useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append(
            'Cookie',
            'connect.sid=s%3A6OVdwmhVv_cQCbw4O0bbeLxswZhLoCI6.fr%2FkDyMb%2B3Sh7az52%2B%2Fh6rYH0bR79IHMJ9R3yV8%2FKUw',
        );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(API_PRODUCT, requestOptions)
            .then(response => response.json())
            .then(result => setDataProduct(result))
            .catch(error => console.log('error', error));
    }, []);
    const handleSearch = (keyword) => {
        const results = dataProduct.filter(product =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                backgroundColor: '#FFFFFF'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 22, height: 22 }} source={require('@/images/back.png')} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                    <Text style={{ fontSize: 22, color: 'black' }}>Tìm kiếm sản phẩm</Text>
                </View>
            </View>
            <View style={styles.viewSearch}>
                <View style={styles.search}>
                    <View>
                        <TextInput style={styles.textInputSearch}
                            placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                            value={searchKeyword}
                            onChangeText={(text) => {
                                setSearchKeyword(text);
                                handleSearch(text);
                            }} />
                    </View>
                    <View>
                        <IconI name="search-outline" size={30} color={'gray'} />
                    </View>
                </View>
            </View>
            <View>
                <FlatList
                    numColumns={2}
                    data={searchResults}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.viewItemProducts}>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: '5%',
                                    }}
                                    onPress={() =>
                                        navigation.navigate(
                                            'DetailProductScreen',
                                            (item = {
                                                _id: item._id,
                                                name: item.name,
                                                image: item.image,
                                                category: item.loai,
                                                price: item.price,
                                                quantitySold: item.quantitySold,
                                            }),
                                        )
                                    }>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: 90, height: 131 }}
                                    />
                                    <Text>{item.name}</Text>
                                    <Text>{item.price} USD</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    viewSearch: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    search: {
        width: '80%',
        height: 55,
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#DEDEDE',
    },
    textInputSearch: {},
    viewItem: {
        width: 75,
        height: 105,
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'space-around',
        marginLeft: 20,
        borderColor: '#DEDEDE',
        shadowColor: '#000',
        backgroundColor: COLORS.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    viewItemProducts: {
        width: '43%',
        height: 210,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        borderRadius: 10,
        marginTop: 15,
        marginLeft: '5%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

})

export default SearchProductScreen;