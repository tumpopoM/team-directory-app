import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../src/services/api";

export default function AddScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // ✅ validation
    if (!name || !job) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createUser(name, job);

      Alert.alert("Success", "User created", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (e) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Button title="Back" onPress={() => router.back()} />

      <View style={{ marginTop: 20 }}>
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
          }}
        />

        <Text>Job</Text>
        <TextInput
          value={job}
          onChangeText={setJob}
          placeholder="Enter job"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
          }}
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Submit" onPress={handleSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
}
