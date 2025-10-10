import { Text } from '@/components/ui/text';
import { Link } from "expo-router";
import { View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import "../../global.css";
import { useSetAtom } from 'jotai';
import { isNavbarHiddenAtom } from '@/atoms/navAtoms';
import { useEffect } from 'react';

function Index() {

  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);

  useEffect(() => {
    setIsNavbarHidden(true);
  }, []); 

  return (
    <View className="items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">This is Mochita!</Text>
      <Link className="text-red-500" href={"/pages/tutorial"}>
        Link to the tutorial
      </Link>
    </View>
  );
}

export default withPageWrapper(Index);
