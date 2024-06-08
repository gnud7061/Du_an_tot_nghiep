import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, FlatList } from "react-native";
import axios, { Axios } from 'axios';
import { API_VOUCHER } from "../../config/api-consts";


const VoucherScreen = ({navigation , route}) => {
    const [dataVoucher, setDataVoucher] = useState([]);

    useEffect(() =>{
        axios
        .get(`${API_VOUCHER}`)
        .then(function (response) {
          const data = Array.isArray(response.data) ? response.data : [response.data];
          setDataVoucher(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },[])

    const HandleVoucher = () => {
        console.log(' click HandleVoucher !!!!')
    }
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
                    <Text style={{ fontSize: 22, color: 'black' }}>Chọn Voucher</Text>
                </View>
            </View>
            <View style={{
                width: '100%',
                height: 1,
                backgroundColor: 'grey'
            }}></View>
            <View>
                <FlatList data={dataVoucher} renderItem={({ item, index }) => {
                    return (
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 10,
                                backgroundColor: 'white',
                                padding: 10
                            }}>
                                <View style={{ borderBlockColor: 'black' }}>
                                    <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={require('@/images/logoAPP_MD01_png.png')} />
                                </View>


                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 22, color: 'black' }}>{item.name}</Text>
                                    <Text style={{ color: 'grey' }}>{item.content}</Text>
                                    <Text style={{ color: 'black' }}>BĐ: {item.fromDate}</Text>
                                    <Text>Giảm ngay : {item.price}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'black' }}>HSD: {item.toDate}</Text>
                                        <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={HandleVoucher}>
                                            <Text style={{ color: '#FF2271', fontSize: 20 }}> Dùng ngay</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
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

})

export default VoucherScreen;