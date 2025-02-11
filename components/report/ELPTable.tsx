import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Styles for the ELP table
const styles = StyleSheet.create({
  container: {
    padding: '20px 0',
  },
  header: {
    backgroundColor: 'hsl(0 72.2% 50.6%)',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
    fontSize: 14,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 5,
    marginBottom: 15,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'hsl(0 72.2% 50.6%)',
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
    borderBottomStyle: 'solid',
  },
  cell: {
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#b3b3b3',
    borderRightStyle: 'solid',
    flex: 1,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  remarksContainer: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginTop: 10,
  },
  remarks: {
    padding: 2,
    marginTop: 5,
    fontSize: 10,
  },
  alternateRow: {
    backgroundColor: 'rgba(255, 204, 204, 0.4)',
  },
});

// Define the PRELP data type
interface PRELPData {
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
}

// Props for the ELPTable component
interface ELPTableProps {
  prelpData: PRELPData;
}

const ELPTable: React.FC<ELPTableProps> = ({ prelpData }) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <Text style={styles.sectionHeader}>I. Early Learning Program (ELP)</Text>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Grade</Text>
          <Text style={styles.cell}>Planner</Text>
          <Text style={styles.cell}>Worksheets</Text>
        </View>

        {/* Grade 1 to 8 Rows */}
        {[
          { grade: 'Grade 1', planner: prelpData.grade1Planner, worksheets: prelpData.grade1Worksheets },
          { grade: 'Grade 2', planner: prelpData.grade2Planner, worksheets: prelpData.grade2Worksheets },
          { grade: 'Grade 3', planner: prelpData.grade3Planner, worksheets: prelpData.grade3Worksheets },
          { grade: 'Grade 4', planner: prelpData.grade4Planner, worksheets: prelpData.grade4Worksheets },
          { grade: 'Grade 5', planner: prelpData.grade5Planner, worksheets: prelpData.grade5Worksheets },
          { grade: 'Grade 6', planner: prelpData.grade6Planner, worksheets: prelpData.grade6Worksheets },
          { grade: 'Grade 7', planner: prelpData.grade7Planner, worksheets: prelpData.grade7Worksheets },
          { grade: 'Grade 8', planner: prelpData.grade8Planner, worksheets: prelpData.grade8Worksheets },
        ].map((row, index) => (
          <View key={index} style={[styles.row, index % 2 === 1 ? styles.alternateRow : {}]}>
            <Text style={styles.cell}>{row.grade ? "Yes" : "No"}</Text>
            <Text style={styles.cell}>{row.planner ? "Yes" : "No"}</Text>
            <Text style={styles.cell}>{row.worksheets ? "Yes" : "No"}</Text>
          </View>
        ))}
      </View>

      {/* Remarks Section */}
      <Text style={styles.remarks}>Remarks: {prelpData.remarks}</Text>
    </View>
  );
};

export default ELPTable;