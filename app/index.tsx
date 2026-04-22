import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
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
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f6f7fb" }}>
      <TouchableOpacity
        onPress={() => router.push("/add")}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          backgroundColor: "#007AFF",
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/detail?id=${item.id}`)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                backgroundColor: "#fff",
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#eee",
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },

                elevation: 3,
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                onError={(e) => console.log("image error")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 12,
                }}
              />
              <View>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text style={{ color: "#666" }}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
