import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { getUserById } from "../src/services/api";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text style={{ marginTop: 10 }}>
        {user.first_name} {user.last_name}
      </Text>
      <Text>{user.email}</Text>
    </View>
  );
}
