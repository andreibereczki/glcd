export interface Repository<DTO, AddDTO> {
  getAll?(): Promise<DTO[]>;
  add?(entity: AddDTO): Promise<DTO>;
  getByField?(fields: Record<string, unknown>): Promise<DTO | null>;
  update?(id: number, entity: AddDTO): Promise<void>;
}
