type WebVitalReport = {
  name: string;
  delta: number;
  id: string;
  value: number;
};
type OnPerfEntry = (entry: WebVitalReport) => void;

const reportWebVitals = (onPerfEntry?: OnPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
