import { useNavigate } from "react-router-dom";

export const useQuickActions = () => {
  const navigate = useNavigate();

  const goToAddMedication = () => {
    navigate("/medications");
  };

  //que entre directamente a la pantalla de agregar metricas
  const goToHealthMetrics = () => {
    navigate("/metrics?openAdd=true");
  };

  const goToPillbox = () => {
    navigate("/pillbox");
  };


  return {
    goToAddMedication,
    goToHealthMetrics,
    goToPillbox,
  };
};
