"use client";
import useClassStore from '@/stores/principalReport/classes';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useSubjectStore from '@/stores/principalReport/subjects';
import useTeacherStore from '@/stores/principalReport/teachers';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import useRecheckingStore from '@/stores/principalReport/rechecking';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useStudentModule from '@/stores/principalReport/students';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type Division = {
    grades: {
        id: number;
        name: string;
    }[]; 
    id: number;
    name: string;
}

const CheckingTable = ({ divisions }: { divisions: Division[] }) => {
    const studentStore = useStudentModule();
    const classStore = useClassStore();
    const subjectStore = useSubjectStore();
    const teacherStore = useTeacherStore();
    const recheckingStore = useRecheckingStore();

    // State for selected teacher, subject, and status
    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
    const [newCount, setNewCount] = useState<number>(0);

    useEffect(() => {
        const session = sessionStorage.getItem("student-module-storage");
        if (!session) {
            classStore.setDivisions(divisions);
        }
    }, [divisions]);

    const handleAddRechecking = (classId: number, teacherId: number, subjectId: number, count: number) => {
        recheckingStore.addRechecking(classId, teacherId, subjectId, count);
    };

    // Filter out divisions with no classes
    const filteredDivisions = divisions.filter((division) => {
        return division.grades.some((grade) => classStore.getClassByGrade(grade.id).length > 0);
    });

    return (
        <div>
            <div>
            {filteredDivisions.map((division) => (
                <div key={division.id}>
                    <Separator className='my-10'/>

                    <div className="mb-6">
                        <h2 className='bg-primary/30 p-4 font-semibold text-center rounded-xl'>DIVISION: {division.name}</h2>
                        {division.grades.map((grade) => (
                            <div key={grade.id} className="mb-6">
                                {classStore.getClassByGrade(grade.id).map((classItem) => (
                                    <div key={classItem.id} className="mb-6 bg-primary/10 rounded-md">
                                        <div className='text-center mt-4 pt-2 px-4  rounded-md flex justify-between items-center'>
                                            <p className="font-semibold"></p>
                                            <p className="font-semibold">{classItem.name}</p>
                                            <Badge variant={'destructive'} className='text-secondary-foreground'>Total Students: {studentStore.getClassStrength(classItem.id)}</Badge>
                                              
                                        </div>

                                        <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
                                            <TableHeader className='bg-secondary'>
                                                <TableRow>
                                                    <TableHead className='text-secondary-foreground'>Teacher</TableHead>
                                                    <TableHead className='text-secondary-foreground'>Subject</TableHead>
                                                    <TableHead className='text-secondary-foreground'>Status</TableHead>
                                                    <TableHead className='text-secondary-foreground'>Percent</TableHead>
                                                    <TableHead className='text-secondary-foreground text-right'>Delete</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {recheckingStore.rechecking
                                                    .filter((item) => item.classId === classItem.id)
                                                    .map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {teacherStore.teachers.find(teacher => teacher.id === item.teacherId)?.name || "N/A"}
                                                            </TableCell>
                                                            <TableCell>
                                                                {subjectStore.subjects.find(subject => subject.id === item.subjectId)?.name || "N/A"}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    type='number'
                                                                    min={0}
                                                                    value={item.count}
                                                                    onChange={(e) => recheckingStore.updateRecheckingCount(item.classId, item.teacherId, item.subjectId, parseInt(e.target.value, 10) || 0)}
                                                                />

                                                            </TableCell>
                                                            <TableCell>
                                                                {(item.count / studentStore.getClassStrength(item.classId) * 100).toFixed(2)}%
                                                            </TableCell>
                                                            <TableCell className='text-right'>
                                                                <Button
                                                                    onClick={() => recheckingStore.removeRechecking(item.classId, item.teacherId, item.subjectId)}
                                                                >Delete</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>

                                        <div className='p-4'>
                                            <Label>Add New</Label>
                                            <div className="flex justify-between p-4 bg-accent/20 rounded-md">
                                                <Select value={selectedTeacherId?.toString()} onValueChange={setSelectedTeacherId}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Teacher" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {teacherStore.teachers.map((teacher) => (
                                                            <SelectItem value={teacher.id.toString()} key={teacher.id}>
                                                                {teacher.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                <Select value={selectedSubjectId?.toString()} onValueChange={setSelectedSubjectId}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Subject" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {subjectStore.subjects
                                                            .filter((subject) => subject.gradeId === classItem.gradeId)
                                                            .map((subject) => (
                                                                <SelectItem key={subject.id} value={subject.id.toString()}>
                                                                    {subject.name}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>

                                                <Input
                                                    type='number'
                                                    className='max-w-xs'
                                                    min={0}
                                                    value={newCount}
                                                    onChange={(e) => setNewCount(parseInt(e.target.value, 10) || 0)}
                                                />

                                                <Button
                                                    variant={'default'}
                                                    onClick={() => {
                                                        if (selectedTeacherId && selectedSubjectId) {
                                                            handleAddRechecking(
                                                                classItem.id,
                                                                parseInt(selectedTeacherId),
                                                                parseInt(selectedSubjectId),
                                                                newCount // Set status based on the Switch value
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Any Remarks</CardTitle>
                    <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                    value={recheckingStore.remarks}
                    onChange={(e) => recheckingStore.setRemarks(e.target.value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default CheckingTable;
