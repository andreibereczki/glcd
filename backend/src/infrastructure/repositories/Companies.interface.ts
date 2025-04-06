export interface Repository<DTO, AddDTO> {
  getAll(): Promise<DTO[]>;
  add(entity: AddDTO): Promise<void>;
}
