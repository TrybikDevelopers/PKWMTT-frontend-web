export type GeneralGroups = string[];
export type SubGroups = string[];
export type AcademicHours = string[];

export type ClassEntry = {
    name: string;
    classroom: string;
    rowId: number;
    type:
        | "SEMINAR"
        | "LECTURE"
        | "LABORATORY"
        | "COMPUTER_LABORATORY"
        | "OTHER"
        | "EXERCISES";
}[];

export type Timetable = {
    name: string;
    data: {
        name: string;
        odd: ClassEntry[];
        even: ClassEntry[];
    }[];
};

export type FetchGeneralGroupsResult =
    | {
          data: null;
          error: "UnknownError";
      }
    | {
          error: null;
          data: GeneralGroups;
      };

export type FetchSubGroupsResult =
    | {
          data: null;
          error: "UnknownError";
      }
    | {
          error: null;
          data: SubGroups;
      };

export type FetchAcademicHoursResult =
    | {
          data: null;
          error: "UnknownError";
      }
    | {
          error: null;
          data: { hours: AcademicHours };
      };

export type FetchTimetableResult =
    | {
          data: null;
          error: "UnknownError";
      }
    | {
          error: null;
          data: Timetable;
      };
