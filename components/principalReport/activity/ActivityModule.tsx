"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useActivityStore from "@/stores/principalReport/activity";
import React, { useState } from "react";
import { format } from "date-fns";

const ActivityModule = () => {
  const store = useActivityStore();
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [newActivityDate, setNewActivityDate] = useState<string | null>(null);

  const getFirstDayOfCurrentMonth = () => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return firstDayOfCurrentMonth.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };
  
  const getFirstDayOfLastMonth = () => {
    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    return firstDayOfLastMonth.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleAddActivity = () => {
    if (newActivityName.trim() && newActivityDate) {
      store.addActivity({
        id: Date.now(),
        name: newActivityName,
        description: newActivityDescription,
        date: new Date(newActivityDate).toISOString(),
        
      });
      setNewActivityName("");
      setNewActivityDescription("");
      setNewActivityDate(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Activity Module</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {store.activities.map((activity) => (
              <div key={activity.id} className="mb-4 bg-accent p-4 rounded-md">
                <div className="flex items-center justify-between mb-2 gap-4">
                  <Input
                    value={activity.name}
                    onChange={(e) => store.updateActivity(activity.id, { name: e.target.value })}
                    placeholder="Activity Name"
                  />
                  <Button variant="destructive" onClick={() => store.removeActivity(activity.id)}>
                    Remove
                  </Button>
                </div>
                <Textarea
                  value={activity.description}
                  onChange={(e) => store.updateActivity(activity.id, { description: e.target.value })}
                  placeholder="Activity Description"
                />
                <div className="mt-4">
                <input
                  type="date"
                  value={activity.date ? new Date(activity.date).toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (!inputValue || isNaN(Date.parse(inputValue))) {
                      // Handle invalid date or empty input by setting it to null
                      setNewActivityDate(null);
                    } else {
                      setNewActivityDate(inputValue);
                    }
                  }}
                  min={getFirstDayOfLastMonth()} // Set minimum date to 1st of last month
                  max={getFirstDayOfCurrentMonth()} // Set maximum date to 1st of current month
                  
                  className="border rounded px-2 py-1 w-full"
                />

                  <p className="text-sm mt-2">
                    
                    {activity.date ? `Selected date: ${ 

                    format(new Date(activity.date), "PPP")}` : "No date selected"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Activity */}
          <div className="bg-primary/15 p-4 rounded-md">
            <div className="flex items-center mb-4">
              <Input
                value={newActivityName}
                onChange={(e) => setNewActivityName(e.target.value)}
                placeholder="New Activity Name"
              />
            </div>
            <div className="mb-4">
              <Textarea
                value={newActivityDescription}
                onChange={(e) => setNewActivityDescription(e.target.value)}
                placeholder="New Activity Description"
              />
            </div>
            <div className="mb-4">
            <input
              type="date"
              value={newActivityDate || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!inputValue || isNaN(Date.parse(inputValue))) {
                  // Handle invalid date or empty input by setting it to null
                  setNewActivityDate(null);
                } else {
                  setNewActivityDate(inputValue);
                }
              }}
              min={getFirstDayOfLastMonth()} // Set minimum date to 1st of last month
              max={getFirstDayOfCurrentMonth()} // Set maximum date to 1st of current month
              className="border rounded px-2 py-1 w-full"
            />

              <p className="text-sm mt-2">
                {newActivityDate ? `Selected date: ${
                format(new Date(newActivityDate), "PPP")}` : "No date selected"}
              </p>
            </div>
            <Button onClick={handleAddActivity}>Add Activity</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Any Remarks</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={store.remarks}
            onChange={(e) => store.setRemarks(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityModule;
