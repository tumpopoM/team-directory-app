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
import { createUser } from "../src/services/api";

export default function AddScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // validation
    if (!name || !job) {
      Alert.alert("Validation Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await createUser(name, job);

      Alert.alert("Success", "User created successfully", [
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
    <View style={{ padding: 16 }}>
      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />

      <Text>Job</Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}
    </View>
  );
}
