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
        | "EXERCISES"
        | "PROJECT"
        | "OTHER";
};

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
          generalGroups: null;
          error: "UnknownError";
      }
    | {
          generalGroups: GeneralGroups;
          error: null;
      };

export type FetchSubGroupsResult =
    | {
          subGroups: null;
          error: "UnknownError";
      }
    | {
          subGroups: SubGroups;
          error: null;
      };

export type FetchAcademicHoursResult =
    | {
          academicHours: null;
          error: "UnknownError";
      }
    | {
          academicHours: AcademicHours;
          error: null;
      };

export type FetchTimetableResult =
    | {
          timetable: null;
          error: "UnknownError";
      }
    | {
          timetable: Timetable;
          error: null;
      };
