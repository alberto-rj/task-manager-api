import {
  ProjectCreateInput,
  ProjectReadInput,
  ProjectListInput,
  ProjectUpdateInput,
  ProjectDeleteInput,
  ProjectUpdateIsArchivedInput,
} from '@/dtos/project/project.input.dto';
import {
  ProjectOutput,
  ProjectPaginationOutput,
} from '@/dtos/project/project.output.dto';

export interface IProjectService {
  create(input: ProjectCreateInput): Promise<ProjectOutput>;

  getById(input: ProjectReadInput): Promise<ProjectOutput>;

  getAll(query: ProjectListInput): Promise<ProjectPaginationOutput>;

  update(input: ProjectUpdateInput): Promise<ProjectOutput>;

  updateIsArchived(input: ProjectUpdateIsArchivedInput): Promise<ProjectOutput>;

  delete(input: ProjectDeleteInput): Promise<void>;
}
