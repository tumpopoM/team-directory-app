import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>User List</Text>

      <Button title="Go to Detail" onPress={() => router.push("/detail")} />

      <Button title="Go to Add User" onPress={() => router.push("/add")} />
    </View>
  );
}
