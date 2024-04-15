import { useState } from "react";
import { authService } from "../services/authServices";
import useQuery from "./useQuery";

const useAddress = (defaultValue) => {
  const [provinceID, setProvinceID] = useState(defaultValue?.provinceID);
  const [districtID, setDistrictID] = useState(defaultValue?.districtID);
  const [wardID, setWardID] = useState(defaultValue?.wardID);

  const { data: provinceData } = useQuery(authService.getDataProvince);

  const { data: districtData } = useQuery(
    () => provinceID && authService.getDataDistrict(provinceID),
    [provinceID]
  );

  const { data: wardData } = useQuery(
    () => districtID && authService.getDataWard(districtID),
    [districtID]
  );

  const handleProvinceChange = (changeId) => {
    setProvinceID(changeId);
    setDistrictID(undefined);
    setWardID(undefined);
  };

  const handleDistrictChange = (changeId) => {
    setDistrictID(changeId);
    setWardID(undefined);
  };

  const handleWardChange = (changeId) => {
    setWardID(changeId);
  };

  return {
    provinces:
      provinceData?.data?.provinces?.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) || [],
    districts:
      districtData?.data?.districts?.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) || [],
    wards:
      wardData?.data?.wards?.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) || [],
    provinceID,
    districtID,
    wardID,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  };
};

export default useAddress;
