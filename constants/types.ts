export type MasterReport = {
    id: number; // from PrincipalReport
    campusId: number; // from PrincipalReport
    campus: {
        id: string; // User
        email: string; // User
        name: string; // User
        phone?: string; // User
        isSuperUser: boolean; // User
        createdAt: Date; // User
        updatedAt: Date; // User
    };
    createdAt: Date; // from PrincipalReport
    studentRemarks: string; // from PrincipalReport
    staffRemarks: string; // from PrincipalReport
    workloadRemarks: string; // from PrincipalReport
    ttblRemarks: string; // from PrincipalReport
    parentFeedback: string; // from PrincipalReport

    // Optional Relationships
    PRswot?: {
        reportId: number; // from PRswot
        strength: string; // from PRswot
        weakness: string; // from PRswot
        opportunity: string; // from PRswot
        threat: string; // from PRswot
    };
    PRttbl?: {
        reportId: number; // from PRttbl
        PRttblCell: {
            id: number; // from PRttblCell
            rowId: number; // from PRttblCell
            name: string; // from PRttblCell
            avaliable: number; // from PRttblCell
            working: number; // from PRttblCell
            outOfOrder: number; // from PRttblCell
        }[];
    };
    PRstudent?: {
        reportId: number; // from PRstudent
        PRstudentClassCell: {
            id: number; // from PRstudentClassCell
            rowId: number; // from PRstudentClassCell
            classId: number; // from PRstudentClassCell
            class: {
                id: number; // Class
                name: string; // Class
                description: string; // Class
            };
            prev: number; // from PRstudentClassCell
            left: number; // from PRstudentClassCell
            new: number; // from PRstudentClassCell
            movedOver: number; // from PRstudentClassCell
            promoted: number; // from PRstudentClassCell
            transfered: number; // from PRstudentClassCell
            total: number; // from PRstudentClassCell
            boys: number; // from PRstudentClassCell
            girls: number; // from PRstudentClassCell
            PRstudentSectionCell: {
                id: number; // from PRstudentSectionCell
                rowId: number; // from PRstudentSectionCell
                sectionId: number; // from PRstudentSectionCell
                section: {
                    id: number; // ClassSection
                    name: string; // ClassSection
                };
                prev: number; // from PRstudentSectionCell
                left: number; // from PRstudentSectionCell
                new: number; // from PRstudentSectionCell
                movedOver: number; // from PRstudentSectionCell
                promoted: number; // from PRstudentSectionCell
                transfered: number; // from PRstudentSectionCell
                total: number; // from PRstudentSectionCell
                boys: number; // from PRstudentSectionCell
                girls: number; // from PRstudentSectionCell
            }[];
        }[];
    };
    PRStaff?: {
        reportId: number; // from PRStaff
        PRStaffDeps: {
            id: number; // from PRStaffDeps
            rowId: number; // from PRStaffDeps
            departmentId: number; // from PRStaffDeps
            department: {
                id: number; // Department
                name: string; // Department
            };
            PRStaffDesig: {
                id: number; // from PRStaffDesig
                rowId: number; // from PRStaffDesig
                designationId: number; // from PRStaffDesig
                designation: {
                    id: number; // Designation
                    name: string; // Designation
                };
                prev: number; // from PRStaffDesig
                left: number; // from PRStaffDesig
                new: number; // from PRStaffDesig
                total: number; // from PRStaffDesig
            }[];
        }[];
    };
    PRworkload?: {
        reportId: number; // from PRworkload
        PRworkloadCell: {
            id: number; // from PRworkloadCell
            rowId: number; // from PRworkloadCell
            teacherId: number; // from PRworkloadCell
            teacher: {
                id: number; // Staff
                name: string; // Staff
                isActive: boolean; // Staff
                salary: number; // Staff
                dateJoined: Date; // Staff
            };
            workload: number; // from PRworkloadCell
            students: number; // from PRworkloadCell
        }[];
    };
    PRactivity?: {
        reportId: number; // from PRactivity
        PRactivityCell: {
            id: number; // from PRactivityCell
            rowId: number; // from PRactivityCell
            cellValue: string; // from PRactivityCell
            description: string; // from PRactivityCell
        }[];
    };
    PRHcd?: {
        reportId: number; // from PRHcd
        meetings: number; // from PRHcd
        workload: number; // from PRHcd
    };
};

export type Report = {
  id: number;
  campusId: number;
  createdAt: string;
  studentRemarks: string | null;
  staffRemarks: string | null;
  workloadRemarks: string | null;
  ttblRemarks: string | null;
  parentFeedback: string | null;
  completed: boolean;
  campus: {
      id: string;
      fkId: number;
      email: string;
      name: string;
      phone: string;
      isSuperUser: boolean;
      password: string;
      cityId: number;
      createdAt: string;
      updatedAt: string;
  };
  PRstudent: {
      reportId: number;
      remarks: string;
      PRstudentClassCell: {
          id: number;
          rowId: number;
          classId: number;
          prev: number;
          left: number;
          new: number;
          movedOver: number;
          promoted: number;
          transfered: number;
          total: number;
          boys: number;
          girls: number;
          class: {
              id: number;
              name: string;
              description: string;
              campusId: number;
              gradeId: number;
          };
          PRstudentSectionCell: {
              id: number;
              rowId: number;
              sectionId: number;
              prev: number;
              left: number;
              new: number;
              movedOver: number;
              promoted: number;
              transfered: number;
              total: number;
              boys: number;
              girls: number;
              section: {
                  id: number;
                  name: string;
                  classId: number;
              };
          }[];
      }[];
  };
  PRStaff: {
      reportId: number;
      remarks: string;
      PRStaffDeps: {
          id: number;
          rowId: number;
          departmentId: number;
          department: {
              id: number;
              name: string;
          };
          PRStaffDesig: {
              id: number;
              rowId: number;
              designationId: number;
              prev: number;
              left: number;
              new: number;
              total: number;
              designation: {
                  id: number;
                  name: string;
                  departmentId: number;
              };
          }[];
      }[];
  };
  PRworkload: {
      reportId: number;
      remarks: string;
      PRworkloadCell: {
          id: number;
          rowId: number;
          teacherId: number;
          workload: number;
          isHomeland: boolean;
          students: number;
          teacher: {
              id: number;
              campusId: number;
              name: string;
              designationId: number;
              salary: number;
              isActive: boolean;
              dateJoined: string;
              statusId: number;
          };
      }[];
  };
  PRObservationRecord: {
      remarks: string
      reportId: number;
      PRObservationRecordCell: {
          id: number;
          rowId: number;
          walkthrough: string;
          informed: string;
          uninformed: string;
          teacher: {
              id: number;
              campusId: number;
              name: string;
              designationId: number;
              salary: number;
              isActive: boolean;
              dateJoined: string;
              statusId: number;
          };
      }[];
  };
  PRrechecking: {
    reportId: number;
    remarks: string;
    PRrecheckingCell: {
      id: number;
      rowId: number;
      classId: number;
      count: number;
      percentage: number;
      studentCount: number;
      PRrecheckingSubjectCell: {
        id: number;
        rowId: number;
        subjectId: number;
        count: number;
        subject: {
          id: number;
          name: string;
          gradeId: number;
        };
      }[];
      class: {
        id: number;
        name: string;
        description: string;
        campusId: number;
        gradeId: number;
        grade: {
          id: number;
          name: string;
          division: {
            id: number;
            name: string;
          };
        };
      };
    }[];
  };
  PRttbl: {
      reportId: number;
      remarks: string;
      PRttblCell: {
          id: number;
          rowId: number;
          name: string;
          avaliable: number;
          working: number;
          outOfOrder: number;
      }[];
  };
  PRttblContent: {
      reportId: number;
      tbisRemarks: string | null;
      preNurseryCLLE: boolean;
      preNurseryCLLU: boolean;
      preNurseryMD: boolean;
      nurseryCLLE: boolean;
      nurseryCLLU: boolean;
      nurseryMD: boolean;
      kindergartenCLLE: boolean;
      kindergartenCLLU: boolean;
      kindergartenMD: boolean;
      g1Eng: boolean;
      g1Urdu: boolean;
      g1Math: boolean;
      g1GK: boolean;
      g1ICT: boolean;
      g1Isl: boolean;
      g2Eng: boolean;
      g2Urdu: boolean;
      g2Math: boolean;
      g2GK: boolean;
      g2ICT: boolean;
      g2Isl: boolean;
      g3Eng: boolean;
      g3Urdu: boolean;
      g3Math: boolean;
      g3GK: boolean;
      g3ICT: boolean;
      g3Isl: boolean;
      g4Eng: boolean;
      g4Urdu: boolean;
      g4Math: boolean;
      g4SS: boolean;
      g4ICT: boolean;
      g4Isl: boolean;
      g4Sci: boolean;
      g5Eng: boolean;
      g5Urdu: boolean;
      g5Math: boolean;
      g5SS: boolean;
      g5ICT: boolean;
      g5Isl: boolean;
      g5Sci: boolean;
  };
  PRHcd: {
    reportId: number;
    remarks: string;
    meetings: number;
    workload: number;
    preNurseryPlanner: boolean;
    preNurseryWorksheets: boolean;
    preNuseryTTBL: boolean;
    nurseryPlanner: boolean;
    nurseryWorksheets: boolean;
    nurseryTTBL: boolean;
    kindergartenPlanner: boolean;
    kindergartenWorksheets: boolean;
    kindergartenTTBL: boolean;
    grade1Planner: boolean;
    grade1Worksheets: boolean;
    grade1TTBL: boolean;
    grade2Planner: boolean;
    grade2Worksheets: boolean;
    grade2TTBL: boolean;
    grade3Planner: boolean;
    grade3Worksheets: boolean;
    grade3TTBL: boolean;
    grade4Planner: boolean;
    grade4Worksheets: boolean;
    grade4TTBL: boolean;
    grade5Planner: boolean;
    grade5Worksheets: boolean;
    grade5TTBL: boolean;
    grade6Planner: boolean;
    grade6Worksheets: boolean;
    grade7Planner: boolean;
    grade7Worksheets: boolean;
    grade8Planner: boolean;
    grade8Worksheets: boolean;
  };
  PRTenuffus: {
      reportId: number;
      remarks: string;
      ealyYears: number;
      primaryYears: number;
      middleYears: number;
      number: string | null;
  };
  PRELP: {
    reportId: number;
    remarks: string;
    grade1Planner: boolean;
    grade1Worksheets: boolean;
    grade2Planner: boolean;
    grade2Worksheets: boolean;
    grade3Planner: boolean;
    grade3Worksheets: boolean;
    grade4Planner: boolean;
    grade4Worksheets: boolean;
    grade5Planner: boolean;
    grade5Worksheets: boolean;
    grade6Planner: boolean;
    grade6Worksheets: boolean;
    grade7Planner: boolean;
    grade7Worksheets: boolean;
    grade8Planner: boolean;
    grade8Worksheets: boolean;
  };
  PRswot: {
      reportId: number;
      strength: string;
      weakness: string;
      opportunity: string;
      threat: string;
  };
  PRactivity: {
      reportId: number;
      remarks: string;
      PRactivityCell: {
          id: number;
          rowId: number;
          cellValue: string;
          date: string;
          description: string;
      }[];
  };
};


  

type Teacher = {
  id: number;
  campusId: number;
  name: string;
  designationId: number;
  salary: number;
  isActive: boolean;
  dateJoined: string;
  statusId: number;
};

type Class = {
  id: number;
  name: string;
  description: string;
  campusId: number;
  gradeId: number;
};

type Subject = {
  id: number;
  name: string;
  gradeId: number;
};