import SLButton from "@/src/components/ui/SL-Button";
import SLImage from "@/src/components/ui/SL-Image";
import { useStore } from "@/src/store/useStore";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { completeOnboarding } = useStore();
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center bg-SL px-8" // Using Tailwind CSS classes
    >
      <View className="h-3/4 w-full bg-SL-dark/15 rounded-3xl mb-5">
        <SLImage
          source={require("@/src/assets/images/onBoardingImg.jpg")}
          alt="Onboarding Image"
          shape="rounded"
          className="opacity-90"
        />
      </View>
      <Text className="text-2xl uppercase text-rose-100 font-WorkSans mx-1">
        Welcome to Logbook
      </Text>
      <Text className="text-lg uppercase text-rose-100 font-WorkSansLight mx-1">
        Never give up!
      </Text>
      <SLButton
        title="Start"
        onPress={completeOnboarding}
        theme="primary"
        className="mt-5 w-full" // Using Tailwind CSS classes
        disabled={false}
      />
    </SafeAreaView>
  );
}
