import { View } from "react-native";

export default function Separator() {
    return (
        <View style={{
            height: 1, // Espessura da linha
            width: '100%',
            backgroundColor: '#2e302e', // Cor da linha
            marginVertical: 10,
        }} />
    )
}