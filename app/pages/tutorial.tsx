import { Text, View } from "react-native";
import { withPageWrapper } from "../../components/wrappers/withPageWrapper";
import { isNavbarHiddenAtom } from "@/atoms/navAtoms";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

function Tutorial() {

  const setIsNavbarHidden = useSetAtom(isNavbarHiddenAtom);
  
    useEffect(() => {
      setIsNavbarHidden(false);
    }, []); 

    
  return (
    <View>
      <Text>Tutorial Page</Text>
    </View>
  );
}

export default withPageWrapper(Tutorial);
