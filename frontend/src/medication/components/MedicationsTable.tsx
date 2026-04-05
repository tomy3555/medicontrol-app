import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Pencil, Trash2 } from "lucide-react";
import type { Medication } from "@/medication/interfaces/medication.interface";


interface Props {
  medications: Medication[];
  search: string;
  setSearch: (value: string) => void;
  onEdit: (med: Medication) => void;
  onDelete: (med: Medication) => void;
}

export const MedicationsTable = ({
  medications,
  search,
  setSearch,
  onEdit,
  onDelete,
}: Props) => {

  const filtered = medications.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.dosage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="shadow-card">
      
      {/* HEADER */}
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* título */}
          <CardTitle className="text-base font-semibold">
            All Medications
          </CardTitle>

          {/* buscador */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>

      {/* TABLE */}
      <CardContent>
        <Table>

          {/* columnas */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Notes</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* filas */}
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No medications found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((med) => (
                <TableRow key={med.id}>
                  
                  {/* name */}
                  <TableCell className="font-medium">
                    {med.name}
                  </TableCell>

                  {/* dosage */}
                  <TableCell>
                    {med.dosage}
                  </TableCell>

                  {/* notes */}
                  <TableCell>
                    {med.notes || "-"}
                  </TableCell>

                  {/* acciones */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(med)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => onDelete(med)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                    </div>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </CardContent>
    </Card>
  );
};
