import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
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
        <Text>Name</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 12,
            marginBottom: 16,
            borderRadius: 10,
            backgroundColor: "#f9f9f9",
          }}
        />

        <Text>Job</Text>
        <TextInput
          value={job}
          onChangeText={setJob}
          placeholder="Enter job"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 12,
            marginBottom: 16,
            borderRadius: 10,
            backgroundColor: "#f9f9f9",
          }}
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#007AFF",
              padding: 14,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
