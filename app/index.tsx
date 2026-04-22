import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUsers } from "../src/services/api";

export default function HomeScreen() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.data);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // loading
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  // error
  if (error) {
    return <Text>{error}</Text>;
  }

  // empty
  if (users.length === 0) {
    return <Text>No users found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Button title="Add Teammate" onPress={() => router.push("/add")} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/detail?id=${item.id}`)}
          >
            <View style={{ flexDirection: "row", padding: 12 }}>
              <Image
                source={{ uri: item.avatar }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text>
                  {item.first_name} {item.last_name}
                </Text>
                <Text>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
