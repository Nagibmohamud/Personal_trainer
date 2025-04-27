export type Customer = Omit<CustomerData, "_links">;

export type CustomerData = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
      self: {
        href: string;
      };
      customer: {
        href: string;
      };
      trainings: {
        href: string;
      };
    };
  };

export type Training = Omit<TrainingData, "_links">;

export type TrainingData = {
    date: string;
    time: string;
    duration: number;
    activity: string;
    _links: {
      self: {
        href: string;
      };
      training: {
        href: string;
      };
      customer: {
        href: string;
      };
    };
  };