import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserById } from "../src/services/api";
export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const data = await getUserById(id as string);
      setUser(data.data);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!user) {
    return <Text>No user found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f2f2f2" }}>
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#007AFF", fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 16,
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          {user.first_name} {user.last_name}
        </Text>
        <Text style={{ color: "#666" }}>{user.email}</Text>
      </View>
    </SafeAreaView>
  );
}
